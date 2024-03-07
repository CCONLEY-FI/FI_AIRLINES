import React from 'react';
// import "./Homepage.css";
import { PiAirplaneTakeoff, PiAirplaneLanding } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
    const navigate = useNavigate()
    function handleSearchFlights(){
        navigate("/flights", {replace: true})
    }
    return (
        <div className='registerForm'>
        <form action=''>
            <h1>Browse Flights</h1>
            <div className='input-field'>
                <input type='text' placeholder='Origin' required/>
                <PiAirplaneTakeoff  className='icon'/>
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
    );
};

export default Homepage;