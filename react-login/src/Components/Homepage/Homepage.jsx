import React from 'react';
// import "./Homepage.css";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
    
    const navigate = useNavigate();

    const handleSearchFlights = (searchParams) => {
        navigate(
            `/flights?origin=${searchParams.origin}&destination=${searchParams.destination}&arr_scheduled_time_arr=${searchParams.date}`
        );
    };
    return (
        <div className='registerForm'>
            <form action=''>
                <h1>Browse Flights</h1>
                <div className='input-field'>
                    <input type='text' placeholder='Origin' />
                </div>
                <div className='input-field'>
                    <input type='text' placeholder='Destination' />
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
                <button type='submit' onClick={handleSearchFlights}>
                    Search Flights
                </button>
            </form>
        </div>
    );
};

export default Homepage;