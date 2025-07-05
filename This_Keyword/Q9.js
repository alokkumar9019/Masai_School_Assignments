const original={ name: "Alice", hobbies: ["reading", "traveling"] }

const clone=JSON.parse(JSON.stringify(original));

clone.hobbies=[...clone.hobbies,"coding"];

console.log(original);
console.log(clone);