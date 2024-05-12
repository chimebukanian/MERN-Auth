import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {ToastContainer, toast } from "react-toastify"
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const navigate = useNavigate();
    const [inputVal, setInputVal] = useState({
        email: "",
        password: "",
        username: ""
    });
    const {email, password, username} = inputVal;
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setInputVal({
            ...inputVal,
            [name]: value
        })
    };
    const handleError = (err)=>
        toast.error(err, {
            position: "bottom-left",
        });

    const handleSucceess = (msg) => 
        toast.success(msg, {
            position: "bottom-left",
        })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(
                // "http://localhost:3000/signup"
                "https://ebukaauth.onrender.com/",
                {
                    ...inputVal,
                },
                { withCredentials: true }
            )
            
            const {success, message }= data;
            if (success){
                handleSucceess(message);
                setTimeout(()=>{
                    navigate("/");
                }, 1000);
            }else{
                handleError(message);
            }
        }catch(error){
            console.log(error)
        }
        setInputVal({
            ...inputVal,
            email:"",
            password: "",
            username: "",
        })
    };
  return (
    <div className="form_container">
        <h2>signup account</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={email}
                    placeholder="Enter your email" 
                    onChange={handleOnChange} 
                />
            </div>
            <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={handleOnChange}
            />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={handleOnChange}  />
            </div>
            <button type="submit" >Submit</button>
            <span>
                Already have and account<Link to={"/login"}>Login</Link>
            </span>
        </form>
        <ToastContainer />
  
    </div>
  );
};
export default Signup;