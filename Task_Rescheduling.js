let tasks = ["TaskA", "TaskB", "TaskC", "TaskD", "TaskE"];

tasks.shift(); 

tasks.unshift("HighPriorityTaskA", "HighPriorityTaskB");

tasks[tasks.length - 1] = "NewTask";

console.log(tasks);