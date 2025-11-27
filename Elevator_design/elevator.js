var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EventEmitter = require('events');
var MAX_PEOPLE = 8;
var MAX_WEIGHT = 680;
var DIRECTION = {
    UP: 'UP',
    DOWN: 'DOWN',
    IDLE: 'IDLE'
};
var ElevatorRequest = /** @class */ (function () {
    function ElevatorRequest(fromFloor, toFloor, weight) {
        if (weight === void 0) { weight = 70; }
        this.from = fromFloor;
        this.to = toFloor;
        this.weight = weight;
        this.time = Date.now();
    }
    ElevatorRequest.prototype.direction = function () {
        return this.to > this.from ? DIRECTION.UP : DIRECTION.DOWN;
    };
    return ElevatorRequest;
}());
var State = /** @class */ (function () {
    function State(elevator) {
        this.elevator = elevator;
    }
    State.prototype.onTick = function () { };
    State.prototype.enter = function () { };
    State.prototype.exit = function () { };
    return State;
}());
var MovingState = /** @class */ (function (_super) {
    __extends(MovingState, _super);
    function MovingState(elevator, targetFloor) {
        var _this = _super.call(this, elevator) || this;
        _this.targetFloor = targetFloor;
        return _this;
    }
    MovingState.prototype.enter = function () {
        this.elevator.log("MovingState: heading to ".concat(this.targetFloor));
        this.elevator.direction = this.targetFloor > this.elevator.currentFloor ? DIRECTION.UP : DIRECTION.DOWN;
    };
    MovingState.prototype.onTick = function () {
        if (this.elevator.currentFloor === this.targetFloor) {
            this.elevator.setState(new OpenDoorState(this.elevator));
            return;
        }
        if (this.elevator.direction === DIRECTION.UP)
            this.elevator.currentFloor += 1;
        else if (this.elevator.direction === DIRECTION.DOWN)
            this.elevator.currentFloor -= 1;
        this.elevator.log("Moved to floor ".concat(this.elevator.currentFloor));
        if (this.elevator.currentFloor === this.targetFloor) {
            this.elevator.setState(new OpenDoorState(this.elevator));
        }
    };
    return MovingState;
}(State));
var OpenDoorState = /** @class */ (function (_super) {
    __extends(OpenDoorState, _super);
    function OpenDoorState(elevator, openTicks) {
        if (openTicks === void 0) { openTicks = 2; }
        var _this = _super.call(this, elevator) || this;
        _this.remaining = openTicks;
        return _this;
    }
    OpenDoorState.prototype.enter = function () {
        this.elevator.log("OpenDoor: doors opened at floor ".concat(this.elevator.currentFloor));
        this.elevator.direction = DIRECTION.IDLE;
        this.elevator.unloadPassengersAtCurrentFloor();
    };
    OpenDoorState.prototype.onTick = function () {
        if (this.remaining > 0) {
            this.remaining -= 1;
            this.elevator.log("Doors open... (".concat(this.remaining, " ticks left)"));
        }
        else {
            this.elevator.setState(new CloseDoorState(this.elevator));
        }
    };
    return OpenDoorState;
}(State));
var CloseDoorState = /** @class */ (function (_super) {
    __extends(CloseDoorState, _super);
    function CloseDoorState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CloseDoorState.prototype.enter = function () {
        this.elevator.log("CloseDoor: doors closing at floor ".concat(this.elevator.currentFloor));
    };
    CloseDoorState.prototype.onTick = function () {
        if (this.elevator.hasPendingDestinations()) {
            var next = this.elevator.nextDestination();
            this.elevator.setState(new MovingState(this.elevator, next));
        }
        else {
            this.elevator.direction = DIRECTION.IDLE;
            this.elevator.setState(new IdleState(this.elevator));
        }
    };
    return CloseDoorState;
}(State));
var IdleState = /** @class */ (function (_super) {
    __extends(IdleState, _super);
    function IdleState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdleState.prototype.enter = function () {
        this.elevator.log('Idle: waiting for assignment');
        this.elevator.direction = DIRECTION.IDLE;
    };
    IdleState.prototype.onTick = function () { };
    return IdleState;
}(State));
var Elevator = /** @class */ (function (_super) {
    __extends(Elevator, _super);
    function Elevator(id, totalFloors) {
        if (totalFloors === void 0) { totalFloors = 10; }
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.currentFloor = 1;
        _this.totalFloors = totalFloors;
        _this.passengers = [];
        _this.pendingInternal = new Set();
        _this.state = new IdleState(_this);
        _this.direction = DIRECTION.IDLE;
        _this.logs = [];
        _this.lastAssignedRequest = null;
        _this.setState(_this.state);
        return _this;
    }
    Elevator.prototype.log = function (msg) {
        var s = "[Elevator ".concat(this.id, " | Floor ").concat(this.currentFloor, " | ").concat(this.direction, "] ").concat(msg);
        this.logs.push(s);
        console.log(s);
    };
    Elevator.prototype.setState = function (state) {
        if (this.state && this.state.exit)
            this.state.exit();
        this.state = state;
        if (this.state && this.state.enter)
            this.state.enter();
    };
    Elevator.prototype.tick = function () {
        if (this.state && this.state.onTick)
            this.state.onTick();
    };
    Elevator.prototype.totalWeight = function () {
        return this.passengers.reduce(function (s, p) { return s + p.weight; }, 0);
    };
    Elevator.prototype.peopleCount = function () {
        return this.passengers.length;
    };
    Elevator.prototype.canAcceptPassenger = function (weight) {
        return this.peopleCount() < MAX_PEOPLE && (this.totalWeight() + weight) <= MAX_WEIGHT;
    };
    Elevator.prototype.addPassenger = function (to, weight) {
        if (!this.canAcceptPassenger(weight))
            return false;
        this.passengers.push({ to: to, weight: weight });
        this.pendingInternal.add(to);
        return true;
    };
    Elevator.prototype.unloadPassengersAtCurrentFloor = function () {
        var _this = this;
        if (this.passengers.length === 0)
            return;
        var before = this.peopleCount();
        this.passengers = this.passengers.filter(function (p) { return p.to !== _this.currentFloor; });
        this.pendingInternal = new Set(this.passengers.map(function (p) { return p.to; }));
        var after = this.peopleCount();
        var unloaded = before - after;
        if (unloaded > 0)
            this.log("Unloaded ".concat(unloaded, " passenger(s) at floor ").concat(this.currentFloor));
    };
    Elevator.prototype.hasPendingDestinations = function () {
        return this.pendingInternal.size > 0;
    };
    Elevator.prototype.nextDestination = function () {
        var _this = this;
        var dests = Array.from(this.pendingInternal);
        if (dests.length === 0)
            return null;
        dests.sort(function (a, b) { return Math.abs(a - _this.currentFloor) - Math.abs(b - _this.currentFloor); });
        return dests[0];
    };
    Elevator.prototype.assignRequest = function (request) {
        this.lastAssignedRequest = request;
        if (this.currentFloor === request.from) {
            this.setState(new OpenDoorState(this));
            return true;
        }
        this.pendingInternal.add(request.from);
        if (this.state instanceof IdleState || this.state instanceof CloseDoorState) {
            var target = request.from;
            this.setState(new MovingState(this, target));
        }
        return true;
    };
    Elevator.prototype.boardWaitingPassengers = function (waitingRequests) {
        if (waitingRequests === void 0) { waitingRequests = []; }
        var boarded = [];
        for (var _i = 0, waitingRequests_1 = waitingRequests; _i < waitingRequests_1.length; _i++) {
            var req = waitingRequests_1[_i];
            if (this.canAcceptPassenger(req.weight)) {
                this.addPassenger(req.to, req.weight);
                boarded.push(req);
                this.log("Boarded passenger to ".concat(req.to, " (w:").concat(req.weight, "kg)"));
            }
            else {
                this.log("Could not board passenger to ".concat(req.to, ": capacity reached"));
            }
        }
        return boarded;
    };
    return Elevator;
}(EventEmitter));
var ElevatorController = /** @class */ (function () {
    function ElevatorController(elevatorCount, totalFloors) {
        if (elevatorCount === void 0) { elevatorCount = 3; }
        if (totalFloors === void 0) { totalFloors = 10; }
        this.totalFloors = totalFloors;
        this.elevators = Array.from({ length: elevatorCount }, function (v, i) { return new Elevator(i + 1, totalFloors); });
        this.pendingRequests = [];
        this.floorWaiting = new Map();
    }
    ElevatorController.prototype.log = function (msg) {
        console.log("[Controller] ".concat(msg));
    };
    ElevatorController.prototype.requestElevator = function (from, to, weight) {
        if (weight === void 0) { weight = 70; }
        if (from < 1 || to < 1 || from > this.totalFloors || to > this.totalFloors) {
            throw new Error('Invalid floor');
        }
        var req = new ElevatorRequest(from, to, weight);
        this.log("New request from ".concat(from, " -> ").concat(to, " (w:").concat(weight, "kg)"));
        this.assignOrQueue(req);
    };
    ElevatorController.prototype.assignOrQueue = function (req) {
        var candidate = this.findBestElevatorForRequest(req);
        if (candidate) {
            this.log("Assigned to Elevator ".concat(candidate.id));
            candidate.assignRequest(req);
            if (!this.floorWaiting.has(req.from))
                this.floorWaiting.set(req.from, []);
            this.floorWaiting.get(req.from).push(req);
        }
        else {
            this.log('No suitable elevator right now -> queued');
            this.pendingRequests.push(req);
        }
    };
    ElevatorController.prototype.findBestElevatorForRequest = function (req) {
        for (var _i = 0, _a = this.elevators; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.currentFloor === req.from && (e.state instanceof IdleState || e.state instanceof OpenDoorState || e.state instanceof CloseDoorState)) {
                return e;
            }
        }
        var desiredDir = req.direction();
        var movingCandidates = this.elevators.filter(function (e) { return e.state instanceof MovingState || e.direction !== DIRECTION.IDLE; });
        for (var _b = 0, movingCandidates_1 = movingCandidates; _b < movingCandidates_1.length; _b++) {
            var e = movingCandidates_1[_b];
            var lastAssigned = e.lastAssignedRequest;
            var target = lastAssigned ? lastAssigned.from : (e.nextDestination() || null);
            if (target === null)
                continue;
            if (desiredDir === DIRECTION.UP && e.direction === DIRECTION.UP && req.from >= e.currentFloor && req.from <= target)
                return e;
            if (desiredDir === DIRECTION.DOWN && e.direction === DIRECTION.DOWN && req.from <= e.currentFloor && req.from >= target)
                return e;
        }
        var idle = this.elevators.filter(function (e) { return e.state instanceof IdleState || e.direction === DIRECTION.IDLE; });
        if (idle.length > 0) {
            idle.sort(function (a, b) { return Math.abs(a.currentFloor - req.from) - Math.abs(b.currentFloor - req.from); });
            return idle[0];
        }
        return null;
    };
    ElevatorController.prototype.tick = function () {
        var _loop_1 = function (e) {
            var prevFloor = e.currentFloor;
            e.tick();
            if (e.state instanceof OpenDoorState) {
                var floor = e.currentFloor;
                var waiting = this_1.floorWaiting.get(floor) || [];
                if (waiting.length > 0) {
                    var boarded_1 = e.boardWaitingPassengers(waiting);
                    if (boarded_1.length > 0) {
                        var remaining = waiting.filter(function (r) { return !boarded_1.includes(r); });
                        if (remaining.length === 0)
                            this_1.floorWaiting.delete(floor);
                        else
                            this_1.floorWaiting.set(floor, remaining);
                    }
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.elevators; _i < _a.length; _i++) {
            var e = _a[_i];
            _loop_1(e);
        }
        var stillPending = [];
        for (var _b = 0, _c = this.pendingRequests; _b < _c.length; _b++) {
            var req = _c[_b];
            var candidate = this.findBestElevatorForRequest(req);
            if (candidate) {
                this.log("(Retry) Assigned pending request ".concat(req.from, "->").concat(req.to, " to Elevator ").concat(candidate.id));
                candidate.assignRequest(req);
                if (!this.floorWaiting.has(req.from))
                    this.floorWaiting.set(req.from, []);
                this.floorWaiting.get(req.from).push(req);
            }
            else {
                stillPending.push(req);
            }
        }
        this.pendingRequests = stillPending;
    };
    ElevatorController.prototype.startSimulation = function (intervalMs) {
        var _this = this;
        if (intervalMs === void 0) { intervalMs = 1000; }
        this.log('Starting simulation...');
        if (this._sim)
            clearInterval(this._sim);
        this._sim = setInterval(function () { return _this.tick(); }, intervalMs);
    };
    ElevatorController.prototype.stopSimulation = function () {
        if (this._sim)
            clearInterval(this._sim);
        this._sim = null;
    };
    return ElevatorController;
}());
if (require.main === module) {
    var controller = new ElevatorController(3, 10);
    controller.requestElevator(1, 5, 80);
    controller.requestElevator(3, 8, 60);
    controller.requestElevator(10, 2, 75);
    controller.requestElevator(4, 9, 85);
    for (var i = 0; i < 30; i++) {
        console.log('\n--- TICK', i + 1, '---');
        controller.tick();
    }
}
module.exports = { ElevatorController: ElevatorController, ElevatorRequest: ElevatorRequest, Elevator: Elevator, DIRECTION: DIRECTION };
