import React from "react";
import {useDispatch,useSelector} from "react-redux"
import { increment,decrement } from "./counterSlice";
function Counter(){
    const count=useSelector((state)=>state.counter.value);
    const dispatch=useDispatch();

    return (
        <div>
            <h2>Counter App Using Redux</h2>
            <h3>Count: {count}</h3>
            <button onClick={()=> dispatch(increment())}>increment</button>
            <button onClick={()=> dispatch(decrement())}>decrement</button>
        </div>
    )
}

export default Counter;