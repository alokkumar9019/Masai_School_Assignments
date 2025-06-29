/* Problem Statement: You are tasked with creating two functions, one in the global execution context and another inside a function context. In this problem, you need to:

Define a global variable age.
Create a function displayAge that prints the value of the age variable.
Call the displayAge function to show how the global execution context works.
Additionally, create another function changeAge that updates the global age variable within the function, and print the value of age after updating it.
*/

var age=20;

function displayAge(){
    console.log(age);
    function changeName(){
        age=30;
        console.log(age);
    }
    changeName();
}
displayAge();