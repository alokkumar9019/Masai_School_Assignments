import { useContext, useState } from "react"
import { FeedbackContext } from "../context/FeedbackContext"
import { useNavigate } from "react-router-dom";



const FeedbackForm:React.FC=()=>{
     const context=useContext(FeedbackContext);
    const navigate=useNavigate();
    const [error,setError]=useState<string>("");


    if(!context) return <div>Context not found</div>;
    const {feedback,setFeedback}=context;

    const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{

        const {name,value}=e.target;
            setFeedback(prev=>({
                ...prev,
                [name]:name==="rating"?Number(value):value,
            }))
    };

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!feedback.name || !feedback.email || !feedback.rating || !feedback.feedback){
            setError("please Fill out all fields");
            return;
        }

        setError("");
        navigate("/summary")
        
    }

    return(
        <div>
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={feedback.name} onChange={handleChange}/>
                </div>
                <div>
                    <label >Email:</label>
                    <input type="email" name="email" value={feedback.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Rating(1-5):</label>
                    <input type="number" name="rating" min="1" max="5" value={feedback.rating || ""} onChange={handleChange} />
                </div>
                <div>
                    <label>Feedback:</label>
                    <textarea name="feedback" value={feedback.feedback} onChange={handleChange}></textarea>
                </div>
                {error && <p style={{color:"red"}}>{error}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}
   


export default FeedbackForm;