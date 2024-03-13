import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({user, setUser}) => {
    const Navigate = useNavigate()
    console.log(setUser)
    
    const [session, setSession] = useState(true)
    function handleSignOut(e){
        e.preventDefault()
        setSession(false)
        Navigate('/')
    }
    function clearSession(){
        fetch('/logout', { method: 'DELETE' })
        .then(res => {
            if(!res.ok){
                throw new Error('Logout Error')
            }
            else{
                console.log("clearing user")
                setUser(undefined)
            }
        })
        
        .catch(error => {
            console.error("logout failed", error);
        })
    }

    return (
        <div className='registerForm'>
            <form onSubmit={handleSignOut} onClick={ clearSession}>
                <h1>Would you like to sign out??</h1>
                <button type='submit'>IM DONE</button>
            </form>   
        </div>
    );
};

export default Logout;