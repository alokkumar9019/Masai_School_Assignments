var Bike = /** @class */ (function () {
    function Bike() {
    }
    Bike.prototype.start = function () {
        console.log("Bike is starting");
    };
    return Bike;
}());
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.start = function () {
        console.log("Car is starting");
    };
    return Car;
}());
var Driver = /** @class */ (function () {
    function Driver(vehicle) {
        this.vehicle = vehicle;
    }
    Driver.prototype.setVehicle = function (vehicle) {
        this.vehicle = vehicle;
    };
    Driver.prototype.drive = function () {
        this.vehicle.start();
        console.log("Driving...");
    };
    return Driver;
}());
var driver = new Driver(new Bike());
driver.drive();
driver.setVehicle(new Car());
driver.drive();
