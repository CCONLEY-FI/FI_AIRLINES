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
	
	const [ origin, setOrigin ] = useState("")
    const [ arrival, setArrival ] = useState("")
    const [ flightDate, setFlightDate ] = useState("")
    const [ allFlights, setAllFlights ] = useState([])
	

    
    useEffect(() => {
		fetch('/flights')
		.then((r) => r.json())
		.then((flights) => setAllFlights(flights))
	 }, [])
    
    function handleSearchFlights(e){
		e.preventDefault()
		const results = allFlights?.filter((flight) => (
			flight.arrival.includes(arrival) && flight.origin && flight.flightDate
		))
		console.log(results)
		return results
	}


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

