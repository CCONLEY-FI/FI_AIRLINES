import React from 'react';
// import "./Homepage.css";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
    
    const navigate = useNavigate();

    const handleSearchFlights = (e) => {
        e.preventDefault(); // Prevent default form submission
        const origin = e.target.origin.value;
        const destination = e.target.destination.value;
        const date = e.target.querySelector('input[type="date"]').value;
        const flightClass = e.target.querySelector('select').value;
        navigate(
            `/flights?origin=${origin}&destination=${destination}&date=${date}&class=${flightClass}`
        );
    };
    return (
        <div className='registerForm'>
        <form action=''>
            <h1>Browse Flights</h1>
            <div className='input-field'>
                <input type='text' placeholder='Origin' required/>
            </div>
            <div className='input-field'>
                <input type='text' placeholder='Destination' required/>
            </div>
            <div className='input-field'>
                <input type='date' placeholder='Date' required/>
            </div>
            <button type='submit' onClick={handleSearchFlights}>Search Flights</button>
        </form>
    </div>
    );
};

export default Homepage;