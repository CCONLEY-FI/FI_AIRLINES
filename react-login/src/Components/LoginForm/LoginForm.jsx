import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
        }
    };

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
