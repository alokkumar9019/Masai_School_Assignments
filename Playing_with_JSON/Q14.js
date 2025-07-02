const user = {
  name: "John Doe",
  age: 25,
  email: "john@example.com",
  isAdmin: false
};

let jsonString=JSON.stringify(user);

let parsedUser=JSON.parse(jsonString);


console.log("Name:", parsedUser.name);
console.log("Age:", parsedUser.age);
console.log("Email:", parsedUser.email);
console.log("Admin:", parsedUser.isAdmin);


