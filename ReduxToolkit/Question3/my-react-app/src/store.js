import {configureStore} from "@reduxjs/toolkit";
import counterreducer from "./counterSlice";

export const store=configureStore({
    reducer:{
        counter:counterreducer,
    }
})