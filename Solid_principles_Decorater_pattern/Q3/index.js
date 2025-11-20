var Car = /** @class */ (function () {
    function Car() {
        this.engine = new PetrolEngine();
    }
    Car.prototype.drive = function () {
        this.engine.start();
        console.log("Driving car");
    };
    return Car;
}());
var PetrolEngine = /** @class */ (function () {
    function PetrolEngine() {
    }
    PetrolEngine.prototype.start = function () {
        console.log("Petrol engine started");
    };
    return PetrolEngine;
}());
var DieselEngine = /** @class */ (function () {
    function DieselEngine() {
    }
    DieselEngine.prototype.start = function () {
        console.log("Diesel engine started");
    };
    return DieselEngine;
}());
var Car = /** @class */ (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car.prototype.drive = function () {
        this.engine.start();
        console.log("Driving car");
    };
    return Car;
}());
var car1 = new Car(new PetrolEngine());
car1.drive();
var car2 = new Car(new DieselEngine());
car2.drive();
