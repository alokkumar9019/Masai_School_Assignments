/*
this is tightly coupled because:
Car depends on a concrete class (PetrolEngine)
Car directly creates new PetrolEngine().
so the engine type is hard-coded.

you cannot replace the engine without editing the Car class
If you want a DieselEngine, you must open the Car class and change:

no flexibility for testing or future engines
you cannot inject ElectricEngine, HybridEngine, etc., without modifying Car.
*/

/*Refactored Version Using Loose Coupling
*/
interface IEngine {
  start(): void;
}

class PetrolEngine implements IEngine {
  start(): void {
    console.log("Petrol engine started");
  }
}

class DieselEngine implements IEngine {
  start(): void {
    console.log("Diesel engine started");
  }
}

class Car {
  engine: IEngine;

  constructor(engine: IEngine) {
    this.engine = engine;
  }

  drive(): void {
    this.engine.start();
    console.log("Driving car");
  }
}
const car1 = new Car(new PetrolEngine());
car1.drive();

const car2 = new Car(new DieselEngine());
car2.drive();
