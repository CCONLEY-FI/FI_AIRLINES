import React from 'react';
import "./LoginForm.css";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";


const LoginForm = ( isLoggedIn, setIsLoggedIn ) => {
	const [ username, setUsername ] = useState("")
	const [ password, setPassword ] = useState("")

    const navigate = useNavigate()
    const handleRegister = () => {
        navigate("/register")
    }
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch("/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
          });

          if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
          }

          const user = await response.json();
          console.log("Login Successful", user);
		  
          navigate("/homepage"); // Redirect after login
      } catch (error) {
          console.error(error.message);
		  alert("Invalid Credentials")
      }
  };
    return (
        <div className='loginForm'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className='input-field'>
                    <input type='text' placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} />
                    <FaUserAstronaut className='icon' />
                </div>
                <div className='input-field'>
                    <input type='text' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <RiLockPasswordFill className='icon' />
                </div>
                
                <div className='input-field'>
                    <input type='submit' value='Login' onClick={handleSubmit}/>
                </div>
                <div className='remember-me-forget'>
                    <label><input type="checkbox"/>Remember Me</label>
                    <a href='#'>Forget Password</a>
                </div>
                
                {/* <button type='submit'>Login</button> */}
                <div className="register"><p>Don't have an account? <a onClick={handleRegister}>Register</a></p></div>
               
                
            </form>
            

        </div>
    );
};

export default LoginForm;