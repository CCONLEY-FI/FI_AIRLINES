import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate()
    const handleRegister = () => {
        navigate("/register")
    }
    function handleSignIn(){
        navigate("/frontpage", {replace: true})
    }
    return (
        <div className='loginForm'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className='input-field'>
                    <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='input-field'>
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
