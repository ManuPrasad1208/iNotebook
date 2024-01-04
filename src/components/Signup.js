import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
    //define useNavigate
    let navigate = useNavigate();
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    const onChange=(e)=>{
        //jo bhi values is note ke andar hain rahen,,but change karne pe change hote rahen
        //...note is a spread operator
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();//to prevent from loading the page
        // API Call

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        })
        const json = await response.json();
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem("auth",json.authtoken);
            navigate("/")
            props.showAlert("Account created succesfully","success")
        }
        else{
            props.showAlert("Invalid details","danger")
        }

    }

    return (
        <div className='container mt-2'>
            <h2>Register yourself to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange}  required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter email</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"  required/>
                </div> 
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} minlength={5} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} minlength={5} onChange={onChange} required/>
                </div>

                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        </div>
    )
}

export default Signup
