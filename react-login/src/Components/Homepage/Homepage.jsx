import React from 'react';
// import "./Homepage.css";
import { PiAirplaneTakeoff, PiAirplaneLanding } from 'react-icons/pi';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import FlightResult from '../FlightPage/FlightResult';
import FlightResultCard from '../FlightPage/FlightResultCard';
import RegisterForm from '../RegisterForm/RegisterForm';

const Homepage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
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
        <div>
            {isLoggedIn ? (
                <div className='registerForm'>
                    <form action=''>
                        <h1>Browse Flights</h1>
                        <div className='input-field'>
                            <input type='text' placeholder='Origin' required/>
                            <PiAirplaneTakeoff className='icon'/>
                        </div>
                        <div className='input-field'>
                            <input type='text' placeholder='Destination' required/>
                            <PiAirplaneLanding className='icon' />
                        </div>
                        <div className='input-field'>
                            <input type='date' placeholder='Date' required/>
                        </div>
                        <button type='submit' onClick={handleSearchFlights}>Search Flights</button>
                    </form>
                </div>
            ) : (
                <div>
                    <div className='registerForm'>
                        <form action=''>
                            <h1>Welcome Back</h1>
                            <div className='input-field'>
                                <input type='text' placeholder='Origin' required/>
                                <PiAirplaneTakeoff className='icon'/>
                            </div>
                            <div className='input-field'>
                                <input type='text' placeholder='Destination' required/>
                                <PiAirplaneLanding className='icon' />
                            </div>
                            <div className='input-field'>
                                <input type='date' placeholder='Date' required/>
                            </div>
                            <button type='submit' onClick={handleSearchFlights}>Search Flights</button>
                        </form>
                        <FlightResultCard />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Homepage;

