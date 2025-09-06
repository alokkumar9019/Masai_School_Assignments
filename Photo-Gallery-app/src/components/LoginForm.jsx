import React, {useState} from 'react'

function LoginForm({setUser}) {
    const [email,setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState(false);
    const DB_URl="https://photo-gallery-app-60a24-default-rtdb.asia-southeast1.firebasedatabase.app";
    const handleLogin= async e=>{
            const res=await fetch('https://photo-gallery-app-60a24-default-rtdb.asia-southeast1.firebasedatabase.app/users.json');
            const users=await res.json();
            let found=null;
            
            if(users){
                found=Object.values(users).find((u)=>u.email==email && u.password==password);

            }
            if(found){
                setUser(found);
            } else{
                const newUser={email,password};
                await fetch(`${DB_URl}/users.json`,{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newUser)
                });
                setUser(newUser);
            }

        
    }
  return (
    <div>
        <h2>Sign In/ Sign Up</h2>
         <input type='email' placeholder='Email' value={email} onChange={e=> setEmail(e.target.value)}/>
        <input placeholder='Password' value={password} onChange={e=> setPassword(e.target.value)}/>
        <button onClick={handleLogin}>Continue
        </button>
        {error && <p>{error}</p>}
    </div>
  )
}

export default LoginForm