class Engine {
  start(): void {
    console.log("Engine started");
  }
}

class Car {
  private engine: Engine;
  constructor() {
    this.engine = new Engine();
  }

  drive(): void {
    this.engine.start();
    console.log("Car is driving");
  }
}

const myCar = new Car();
myCar.drive();
