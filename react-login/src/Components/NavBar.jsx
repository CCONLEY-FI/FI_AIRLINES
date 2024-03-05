import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import { NavLink, Link, Outlet } from "react-router-dom";
const NavBar = () => {
    return (
        <div>
            <Link to='/'LoginForm={<LoginForm />}></Link>
            <Link to='/register' RegisterForm={<RegisterForm />}></Link>
            <main>
                <Outlet/>
            </main>
        </div>
        
    );
};

export default NavBar;

