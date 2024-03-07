import React from 'react';
// import "./Homepage.css";
import { PiAirplaneTakeoff, PiAirplaneLanding } from 'react-icons/pi';
import {useEffect, useState} from "react";

const Homepage = () => {
	
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
        <div className='registerForm'>
        <form onSubmit={(e) => handleSearchFlights(e)}>
            <h1>Browse Flights</h1>
            <div className='input-field'>
                <input type='text' placeholder='Origin' value={origin} onChange={(e)=> setOrigin(e.target.value)} required/>
                <PiAirplaneTakeoff className='icon'/>
            </div>
            <div className='input-field'>
                <input type='text' placeholder='Destination'  value={arrival} onChange={setArrival} required/>
                <PiAirplaneLanding className='icon' />

            </div>
            <div className='input-field'>
                <input type='date' placeholder='Date' value={flightDate} onChange={setFlightDate} required/>
            </div>
            <button type='submit' >Search Flights</button>
        </form>
    </div>
    );
};

export default Homepage;