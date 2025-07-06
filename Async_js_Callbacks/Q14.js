console.log("Begin");
setTimeout(() => {
  console.log("Timeout Task");
}, 0);
Promise.resolve().then(() => {
  console.log("Promise Task");
});
console.log("End");
/*JavaScript has an event loop that handles the execution order of synchronous and asynchronous code using:
Call Stack – for synchronous code
Microtasks Queue – for promises 
Macrotasks Queue – for things like setTimeout, setInterval, and DOM events
*/