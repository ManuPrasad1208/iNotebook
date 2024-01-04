import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();//to prevent from loading the page
        //API CALL
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json = await response.json();
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem("token",json.authtoken);
            props.showAlert("Logged in succesfully","success")
            navigate("/")
            
        }
        else{
            props.showAlert("Invalid credentials","danger")
        }
    }
    const [credentials,setCredentials]=useState({email:"",password:""})
    const onChange=(e)=>{
        //jo bhi values is note ke andar hain rahen,,but change karne pe change hote rahen
        //...note is a spread operator
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div className='container mt-2'>
            <h2>Login to iNotebook to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}  />
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>
        </div>
    )
}

export default Login
