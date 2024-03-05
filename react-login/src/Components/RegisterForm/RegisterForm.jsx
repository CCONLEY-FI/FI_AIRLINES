import React from 'react';
import "./RegisterForm1.css";
// import { FaUserAstronaut } from "react-icons/fa";
// import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const navigate = useNavigate()
    const handleSignIn = () => {
        navigate("/")
    }
    return (
        <div className='registerForm'>
            <form action=''>
                <h1>Create Account</h1>
                <div className='input-field'>
                    <input type='text' placeholder='Create Username'/>
                    
                </div>
                <div className='input-field'>
                    <input type='password' placeholder='Create Password'/>
                    

                </div>
                <div className='input-field'>
                    <input type='password' placeholder='Verify Password'/>
                    

                </div>
                {/* <div className='input-field'>
                    <input type='submit' value='Submit'/>
                </div> */}
                <button type='submit' onClick={handleSignIn}>Create Account</button>
            </form>
            
        </div>
    );
};

export default RegisterForm;