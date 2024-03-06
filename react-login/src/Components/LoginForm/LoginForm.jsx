import {useState, useEffect} from 'react';
import "./LoginForm.css";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';



const LoginForm = ({onLogin}) => {

    const [username, setUsername] = useState([]);
    const[password, setPassword] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate()
    const handleRegister = () => {
        navigate("/register")
    }
    function handleSignIn(){
        navigate("/home", {replace: true})
    }

    return (
        <div className='loginForm'>
            <form action=''>
                <h1>Login</h1>
                <div className='input-field'>
                    <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                    <FaUserAstronaut className='icon' />
                </div>
                <div className='input-field'>
                    <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                    <RiLockPasswordFill className='icon' />

                </div>
                <div className='input-field'>
                    <input type='submit' value='Login' onClick={handleSignIn}/>
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