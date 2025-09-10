import React ,{ useState } from "react"
// import { FeedbackData } from "../types"
 type FeedbackData = {
  name: string;
  email: string;
  rating: number;
  feedback: string;
};



const FeedbackForm: React.FC=()=>{
    const [formData,setFormData]=useState<FeedbackData>({
        name:"",
        email:"",
        rating:0,
        feedback:""
    })

    const[submittedData,setSubmittedData]=useState<FeedbackData | null>(null);
    const [error,setError]=useState<string>("");

    const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name,value}=e.target;
        setFormData(prev => ({
            ...prev,
            [name]:name==="rating"?Number(value):value,
        }))
    }

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!formData.name || !formData.email || !formData.rating || !formData.feedback){
            setError("please fill out all fields");
            return;
        
        }
           setError("")
            setSubmittedData(formData);

            setFormData({
                name:"",
                email:"",
                rating:0,
                feedback:"",
            })
    
    };

    return(
        <div>
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label><br />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label >Email</label><br />
                        <input type="text" name="email" value={formData.email} onChange={handleChange} />

                </div>
                <div>
                    <label >Rating(1-5):</label>
                    <input type="number" name="rating" min="1" max="5" value={formData.rating||""}  onChange={handleChange}/>

                </div>
                <div>
                    <label >Feedback:</label>
                    <textarea name="feedback" value={formData.feedback} onChange={handleChange}></textarea>
                </div>

                {error && <p style={{color:"red"}}>{error}</p>}
                <button type="submit">Submit</button>

            </form>

            {submittedData && (
                <div>
                    <h3>Thank you for Your feedback</h3>
                    <p>Name: {submittedData.name}</p>
                    <p>Email: {submittedData.email}</p>
                    <p>Rating: {submittedData.rating}</p>
                    <p>Feedback: {submittedData.feedback}</p>
                </div>

            )}
        </div>
    )
}

export default FeedbackForm;