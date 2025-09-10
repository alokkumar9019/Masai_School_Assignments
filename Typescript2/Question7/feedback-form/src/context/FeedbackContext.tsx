import {  createContext, useState, type ReactNode } from "react";
import type { FeedbackData } from "../components/types"



type FeedbackContextType={
    feedback: FeedbackData;
    setFeedback:React.Dispatch<React.SetStateAction<FeedbackData>>;
}

export const FeedbackContext=createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider = ({children}:{children:ReactNode})=>{
    const [feedback,setFeedback]=useState<FeedbackData>({
        name:"",
        email:"",
        rating:0,
        feedback:"",
    });

    return(
        <FeedbackContext.Provider value={{feedback,setFeedback}}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext;