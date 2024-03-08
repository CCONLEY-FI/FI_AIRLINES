import React from 'react';
import "./RegisterForm1.css";
// import { FaUserAstronaut } from "react-icons/fa";
// import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()
    const handleCreateUser = (e) => {
        e.preventDefault()
        if (password !== verifyPassword) {
            setError("Passwords do not match")
            return
        }
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            if(!res.ok){
                throw new Error('Registration Error')
            }
            return res.json()
        })
        .then(data => {
            console.log(data);
            navigate("/"); 
        })
        .catch(error => {
            console.error('Error:', error);
            setError("Registration failed. Please try again.");
        });

    }
    return (
        <div className='registerForm'>
            <form action='' onSubmit={handleCreateUser}>
                <h1>Create Account</h1>
                <div className='input-field'>
                    <input type='text' placeholder='Create Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    
                </div>
                <div className='input-field'>
                    <input type='password' placeholder='Create Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    

                </div>
                <div className='input-field'>
                    <input type='password' placeholder='Verify Password' value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)}/>
                    

                </div>
                {/* <div className='input-field'>
                    <input type='submit' value='Submit'/>
                </div> */}
                <button type='submit'>Create Account</button>
            </form>
            
        </div>
    );
};

export default RegisterForm;