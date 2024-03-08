import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import Homepage from './Homepage/Homepage';
import { NavLink, Link, Outlet } from "react-router-dom";


const NavBar = () => {
    return (
        <div className='navbar-container'>
            <NavLink to='/homepage' className='navbar'>Home</NavLink>
            {/* <Link to='/flights' className='navbar'>Flights</Link> */}
            <Link to='/' className='navbar'>Login</Link>
            <Link to ='/logout' className='navbar'>Logout</Link>
            <main>
                <Outlet/>
            </main>
        </div>
        
    );
};

export default NavBar;

