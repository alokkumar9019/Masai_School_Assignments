function Car(make, model, year, type, isAvailable = true) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.type = type;
  this.isAvailable = isAvailable;
}

function Customer(name) {
  this.name = name;
  this.rentedCars = [];
}

Customer.prototype.rentCar = function(car) {
  if (car.isAvailable) {
    car.isAvailable = false;
    this.rentedCars.push(car);
    console.log(`${this.name} successfully rented ${car.make} ${car.model}.`);
  } else {
    console.log(`${car.make} ${car.model} is already rented.`);
  }
};

Customer.prototype.returnCar = function(car) {
  setTimeout(() => {
    const index = this.rentedCars.indexOf(car);
    if (index !== -1) {
      car.isAvailable = true;
      this.rentedCars.splice(index, 1);
      console.log(`${this.name} returned ${car.make} ${car.model}.`);
    }
  }, 2000);
};

function PremiumCustomer(name, discountRate) {
  Customer.call(this, name);
  this.discountRate = discountRate;
}

PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

const carTypeRates = {
  SUV: 70,
  Sedan: 50,
  Hatchback: 40
};

function calculateRentalPrice(car, days, isPremium = false, discountRate = 0) {
  const baseRate = carTypeRates[car.type] || 50;
  let total = baseRate * days;
  if (isPremium) {
    total = total - (total * discountRate);
  }
  console.log(`Rental price for ${car.make} ${car.model} for ${days} day(s): $${total}`);
  return total;
}

function Maintenance(car, delay) {
  console.log(`${car.make} ${car.model} sent for maintenance.`);
  car.isAvailable = false;
  setTimeout(() => {
    car.isAvailable = true;
    console.log(`${car.make} ${car.model} is now available after maintenance.`);
  }, delay);
}

const car1 = new Car("Toyota", "Camry", 2021, "Sedan");
const car2 = new Car("Honda", "CRV", 2020, "SUV");
const car3 = new Car("Hyundai", "i20", 2022, "Hatchback");

const alice = new Customer("Alice");
const bob = new PremiumCustomer("Bob", 0.1);

alice.rentCar(car1);
bob.rentCar(car2);
alice.rentCar(car2);

calculateRentalPrice.call(null, car1, 3);
calculateRentalPrice.call(null, car2, 5, true, bob.discountRate);

alice.returnCar(car1);
bob.returnCar(car2);

Maintenance(car3, 3000);

const delayedRental = alice.rentCar.bind(alice, car3);
setTimeout(delayedRental, 4000);

calculateRentalPrice.apply(null, [car3, 2, true, 0.15]);
