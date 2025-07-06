/*Write a JavaScript program that demonstrates the use of a callback function to execute tasks in sequence. Your program should:

Define a function taskOne() that logs "Task 1 completed".
Define a function taskTwo(callback) that logs "Task 2 completed" and then executes the callback function.
Call taskTwo(taskOne) to ensure taskOne runs only after taskTwo finishes.*/

function taskOne(){
    console.log("Task 1 completed");
}
function taskTwo(){
    return new Promise((res,rej)=>{
        res("Task 2 completed");
    })
}

taskTwo().then((data)=>{
    console.log(data);
    taskOne();
});
