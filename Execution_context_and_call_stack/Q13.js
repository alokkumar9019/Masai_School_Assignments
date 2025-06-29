/* You must correct a script that is intended to handle calculations for a small e-commerce checkout system. The script includes functions using ES6 syntax but suffers from issues related to type coercion and syntax errors.
Code Sample: */

const checkout = {

items: [],
total: 0,

addItem(item) {
const price=Number(item.price);
if (isNaN(price) || price<=0){
console.log("Invalid price.");
return;
}
this.items.push(item);
this.total += price;
},

getTotal() {
return `Total: $${this.total.toFixed(2)}`; 
} 
};

checkout.addItem({ name: "Coffee Maker", price: "99.95" });
checkout.addItem({ name: "Milk", price: 3.50 });

console.log(checkout.getTotal()); // Expected issue !