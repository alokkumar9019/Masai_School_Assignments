import {createSlice} from '@reduxjs/toolkit';
const initialState={
    tasks:[],
};

const taskSlice=createSlice({
    name:"tasks",
    initialState,
    reducers:{
        addTask:(state,action)=>{
            const newTask={
                id:Date.now(),
                text:action.payload,
                completed:false,
            };
            state.tasks.push(newTask);
        },
        removeTask:(state,action)=>{
            const id=action.payload;
            state.tasks=state.tasks.filter(task=>task.id!==id);
        },
        toggleTask: (state,action)=>{
            const id=action.payload;
            const task=state.tasks.find(task=>task.id===id);
            if(task){
                task.completed=!task.completed;
            }
        }
    }
})
export const {addTask,removeTask,toggleTask}=taskSlice.actions;
export default taskSlice.reducer;