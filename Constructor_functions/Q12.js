function createCar(make, model, year) {
  return {
    make,
    model,
    year,
    describeCar() {
      console.log(`This car is a ${this.year} ${this.make} ${this.model}.`);
    }
  };
}
const car = createCar("Toyota", "Camry", 2022);
car.describeCar();
// Output: This car is a 2022 Toyota Camry.

const car2 = createCar("Honda", "Civic", 2021);
car2.describeCar();
// Output: This car is a 2021 Honda Civic.
