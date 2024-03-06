import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import Homepage from './Homepage/Homepage';
import { NavLink, Link, Outlet } from "react-router-dom";


const NavBar = () => {
    return (
        <div >
            <NavLink to='/' className='navbar'>Home</NavLink>
            
            <Link to='/register' className='navbar'>Register</Link>
            
            <Link to='/flights' className='navbar'>Flights</Link>
            
            <main>
                <Outlet/>
            </main>
        </div>
        
    );
};

export default NavBar;

