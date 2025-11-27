const EventEmitter = require('events');

const MAX_PEOPLE = 8;
const MAX_WEIGHT = 680;

const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  IDLE: 'IDLE'
};

class ElevatorRequest {
  constructor(fromFloor, toFloor, weight = 70) {
    this.from = fromFloor;
    this.to = toFloor;
    this.weight = weight;
    this.time = Date.now();
  }

  direction() {
    return this.to > this.from ? DIRECTION.UP : DIRECTION.DOWN;
  }
}

class State {
  constructor(elevator) {
    this.elevator = elevator;
  }

  onTick() {}
  enter() {}
  exit() {}
}

class MovingState extends State {
  constructor(elevator, targetFloor) {
    super(elevator);
    this.targetFloor = targetFloor;
  }

  enter() {
    this.elevator.log(`MovingState: heading to ${this.targetFloor}`);
    this.elevator.direction = this.targetFloor > this.elevator.currentFloor ? DIRECTION.UP : DIRECTION.DOWN;
  }

  onTick() {
    if (this.elevator.currentFloor === this.targetFloor) {
      this.elevator.setState(new OpenDoorState(this.elevator));
      return;
    }

    if (this.elevator.direction === DIRECTION.UP) this.elevator.currentFloor += 1;
    else if (this.elevator.direction === DIRECTION.DOWN) this.elevator.currentFloor -= 1;

    this.elevator.log(`Moved to floor ${this.elevator.currentFloor}`);

    if (this.elevator.currentFloor === this.targetFloor) {
      this.elevator.setState(new OpenDoorState(this.elevator));
    }
  }
}

class OpenDoorState extends State {
  constructor(elevator, openTicks = 2) {
    super(elevator);
    this.remaining = openTicks;
  }

  enter() {
    this.elevator.log(`OpenDoor: doors opened at floor ${this.elevator.currentFloor}`);
    this.elevator.direction = DIRECTION.IDLE;
    this.elevator.unloadPassengersAtCurrentFloor();
  }

  onTick() {
    if (this.remaining > 0) {
      this.remaining -= 1;
      this.elevator.log(`Doors open... (${this.remaining} ticks left)`);
    } else {
      this.elevator.setState(new CloseDoorState(this.elevator));
    }
  }
}

class CloseDoorState extends State {
  enter() {
    this.elevator.log(`CloseDoor: doors closing at floor ${this.elevator.currentFloor}`);
  }

  onTick() {
    if (this.elevator.hasPendingDestinations()) {
      const next = this.elevator.nextDestination();
      this.elevator.setState(new MovingState(this.elevator, next));
    } else {
      this.elevator.direction = DIRECTION.IDLE;
      this.elevator.setState(new IdleState(this.elevator));
    }
  }
}

class IdleState extends State {
  enter() {
    this.elevator.log('Idle: waiting for assignment');
    this.elevator.direction = DIRECTION.IDLE;
  }

  onTick() {}
}

class Elevator extends EventEmitter {
  constructor(id, totalFloors = 10) {
    super();
    this.id = id;
    this.currentFloor = 1;
    this.totalFloors = totalFloors;
    this.passengers = [];
    this.pendingInternal = new Set();
    this.state = new IdleState(this);
    this.direction = DIRECTION.IDLE;
    this.logs = [];
    this.lastAssignedRequest = null;
    this.setState(this.state);
  }

  log(msg) {
    const s = `[Elevator ${this.id} | Floor ${this.currentFloor} | ${this.direction}] ${msg}`;
    this.logs.push(s);
    console.log(s);
  }

  setState(state) {
    if (this.state && this.state.exit) this.state.exit();
    this.state = state;
    if (this.state && this.state.enter) this.state.enter();
  }

  tick() {
    if (this.state && this.state.onTick) this.state.onTick();
  }

  totalWeight() {
    return this.passengers.reduce((s, p) => s + p.weight, 0);
  }

  peopleCount() {
    return this.passengers.length;
  }

  canAcceptPassenger(weight) {
    return this.peopleCount() < MAX_PEOPLE && (this.totalWeight() + weight) <= MAX_WEIGHT;
  }

  addPassenger(to, weight) {
    if (!this.canAcceptPassenger(weight)) return false;
    this.passengers.push({ to, weight });
    this.pendingInternal.add(to);
    return true;
  }

  unloadPassengersAtCurrentFloor() {
    if (this.passengers.length === 0) return;
    const before = this.peopleCount();
    this.passengers = this.passengers.filter(p => p.to !== this.currentFloor);
    this.pendingInternal = new Set(this.passengers.map(p => p.to));
    const after = this.peopleCount();
    const unloaded = before - after;
    if (unloaded > 0) this.log(`Unloaded ${unloaded} passenger(s) at floor ${this.currentFloor}`);
  }

  hasPendingDestinations() {
    return this.pendingInternal.size > 0;
  }

  nextDestination() {
    const dests = Array.from(this.pendingInternal);
    if (dests.length === 0) return null;
    dests.sort((a, b) => Math.abs(a - this.currentFloor) - Math.abs(b - this.currentFloor));
    return dests[0];
  }

  assignRequest(request) {
    this.lastAssignedRequest = request;
    if (this.currentFloor === request.from) {
      this.setState(new OpenDoorState(this));
      return true;
    }

    this.pendingInternal.add(request.from);
    if (this.state instanceof IdleState || this.state instanceof CloseDoorState) {
      const target = request.from;
      this.setState(new MovingState(this, target));
    }

    return true;
  }

  boardWaitingPassengers(waitingRequests = []) {
    let boarded = [];
    for (const req of waitingRequests) {
      if (this.canAcceptPassenger(req.weight)) {
        this.addPassenger(req.to, req.weight);
        boarded.push(req);
        this.log(`Boarded passenger to ${req.to} (w:${req.weight}kg)`);
      } else {
        this.log(`Could not board passenger to ${req.to}: capacity reached`);
      }
    }
    return boarded;
  }
}

class ElevatorController {
  constructor(elevatorCount = 3, totalFloors = 10) {
    this.totalFloors = totalFloors;
    this.elevators = Array.from({ length: elevatorCount }, (v, i) => new Elevator(i + 1, totalFloors));
    this.pendingRequests = [];
    this.floorWaiting = new Map();
  }

  log(msg) {
    console.log(`[Controller] ${msg}`);
  }

  requestElevator(from, to, weight = 70) {
    if (from < 1 || to < 1 || from > this.totalFloors || to > this.totalFloors) {
      throw new Error('Invalid floor');
    }
    const req = new ElevatorRequest(from, to, weight);
    this.log(`New request from ${from} -> ${to} (w:${weight}kg)`);
    this.assignOrQueue(req);
  }

  assignOrQueue(req) {
    const candidate = this.findBestElevatorForRequest(req);
    if (candidate) {
      this.log(`Assigned to Elevator ${candidate.id}`);
      candidate.assignRequest(req);
      if (!this.floorWaiting.has(req.from)) this.floorWaiting.set(req.from, []);
      this.floorWaiting.get(req.from).push(req);
    } else {
      this.log('No suitable elevator right now -> queued');
      this.pendingRequests.push(req);
    }
  }

  findBestElevatorForRequest(req) {
    for (const e of this.elevators) {
      if (e.currentFloor === req.from && (e.state instanceof IdleState || e.state instanceof OpenDoorState || e.state instanceof CloseDoorState)) {
        return e;
      }
    }

    const desiredDir = req.direction();
    const movingCandidates = this.elevators.filter(e => e.state instanceof MovingState || e.direction !== DIRECTION.IDLE);
    for (const e of movingCandidates) {
      const lastAssigned = e.lastAssignedRequest;
      const target = lastAssigned ? lastAssigned.from : (e.nextDestination() || null);
      if (target === null) continue;
      if (desiredDir === DIRECTION.UP && e.direction === DIRECTION.UP && req.from >= e.currentFloor && req.from <= target) return e;
      if (desiredDir === DIRECTION.DOWN && e.direction === DIRECTION.DOWN && req.from <= e.currentFloor && req.from >= target) return e;
    }

    const idle = this.elevators.filter(e => e.state instanceof IdleState || e.direction === DIRECTION.IDLE);
    if (idle.length > 0) {
      idle.sort((a, b) => Math.abs(a.currentFloor - req.from) - Math.abs(b.currentFloor - req.from));
      return idle[0];
    }

    return null;
  }

  tick() {
    for (const e of this.elevators) {
      const prevFloor = e.currentFloor;
      e.tick();

      if (e.state instanceof OpenDoorState) {
        const floor = e.currentFloor;
        const waiting = this.floorWaiting.get(floor) || [];
        if (waiting.length > 0) {
          const boarded = e.boardWaitingPassengers(waiting);
          if (boarded.length > 0) {
            const remaining = waiting.filter(r => !boarded.includes(r));
            if (remaining.length === 0) this.floorWaiting.delete(floor);
            else this.floorWaiting.set(floor, remaining);
          }
        }
      }
    }

    const stillPending = [];
    for (const req of this.pendingRequests) {
      const candidate = this.findBestElevatorForRequest(req);
      if (candidate) {
        this.log(`(Retry) Assigned pending request ${req.from}->${req.to} to Elevator ${candidate.id}`);
        candidate.assignRequest(req);
        if (!this.floorWaiting.has(req.from)) this.floorWaiting.set(req.from, []);
        this.floorWaiting.get(req.from).push(req);
      } else {
        stillPending.push(req);
      }
    }
    this.pendingRequests = stillPending;
  }

  startSimulation(intervalMs = 1000) {
    this.log('Starting simulation...');
    if (this._sim) clearInterval(this._sim);
    this._sim = setInterval(() => this.tick(), intervalMs);
  }

  stopSimulation() {
    if (this._sim) clearInterval(this._sim);
    this._sim = null;
  }
}

if (require.main === module) {
  const controller = new ElevatorController(3, 10);

  controller.requestElevator(1, 5, 80);
  controller.requestElevator(3, 8, 60);
  controller.requestElevator(10, 2, 75);
  controller.requestElevator(4, 9, 85);

  for (let i = 0; i < 30; i++) {
    console.log('\n--- TICK', i + 1, '---');
    controller.tick();
  }
}

module.exports = { ElevatorController, ElevatorRequest, Elevator, DIRECTION };