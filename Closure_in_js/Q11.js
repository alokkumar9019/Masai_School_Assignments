/* Create a simple function outerFunction that defines a variable message within its scope. Return an inner function that logs the message when invoked. Demonstrate the concept of closure by invoking the outer function and storing the result in a variable. Call the stored function and ensure that it logs the correct message even after the outer function has completed its execution.*/

function outerFunction(){
    var message="Hello World";
    function innerFunction(){
        console.log(message);
    }
    return innerFunction;
}

let a=outerFunction();
a();