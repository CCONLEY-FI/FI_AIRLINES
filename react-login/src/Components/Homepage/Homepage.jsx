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
            <form onSubmit={handleSearchFlights}>
                <h1>Browse Flights</h1>
                <div className='input-field'>
                    <input name='origin' type='text' placeholder='Origin' />
                </div>
                <div className='input-field'>
                    <input name='destination' type='text' placeholder='Destination' />
                </div>
                <div className='input-field'>
                    <input type='date' placeholder='Date' />
                </div>
                <div className='input-field'>
                    <select>
                        <option value='Economy'>Economy</option>
                        <option value='Business'>Business</option>
                        <option value='First Class'>First Class</option>
                    </select>
                    {/* <input type='dropdown' placeholder='Verify Password'/> */}
                </div>
                <button type='submit'>
                    Search Flights
                </button>
            </form>
        </div>
    );
};

export default Homepage;