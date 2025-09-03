import React from "react";
import {useDispatch} from "react-redux";
import { addTask } from "../taskSlice";
import { useState } from "react";

function TaskInput(){
    const [task,setTask]=useState("")
    const dispatch=useDispatch();

    const handleAddTask=()=>{
        if(task.trim()!==""){
            dispatch(addTask(task));
            setTask("");
        }
    };
    return(
        <div>
            <input type="text" value={task} onChange={(e)=>setTask(e.target.value)} placeholder="Enter A New Task" />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}

export default TaskInput;