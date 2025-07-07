/* Simulate a workflow where:

Task A (startTask): Resolves after 1s with "Task A completed"
Task B (processTask): Takes Task A's output, resolves after 1.5s with "Task B processed: <Task A's output>"
Task C (finalizeTask): Takes Task B's output, resolves after 0.5s with "Final result: <Task B's output>"
Requirements:

Use promise chaining (.then())
Log each step's output
Handle errors if any task fails*/

function taskA(){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res("Task A completed");
        },1000);
    })
}

function taskB(taskAOutput){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(`Task B processed: ${taskAOutput}`);
        },1500);
    })
}
function taskC(taskBOutput){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(`Final result: ${taskBOutput}`);
        },500);
    })
}
taskA()
.then((taskAOutput)=>{
    console.log(taskAOutput);
    return taskB(taskAOutput);
})
.then((taskBOutput)=>{
    console.log(taskBOutput);
    return taskC(taskBOutput);
}).then((taskCOutput)=>{
    console.log(taskCOutput);
}).catch(err=>console.log(err));