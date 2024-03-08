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
	const [ results, setResults ] = useState([])
	const [ flightOrigin, setFlightOrigin ] = useState("")
    const [ flightArrival, setFlightArrival ] = useState("")
    const [ flightDate, setFlightDate ] = useState("")
    const [ allFlights, setAllFlights ] = useState([])
	

    
    useEffect(() => {
		fetch('/flights')
		.then((r) => r.json())
		.then((flights) => setAllFlights(flights))
	 }, [])
    const navigate = useNavigate()
    function handleSearchFlights(e){
		e.preventDefault()
		const results = allFlights?.filter((flight) => (
			flight.destination.includes(flightArrival) && flight.origin.includes(flightOrigin) && flight.departure_date.includes(flightDate)
		))
		console.log(results)
		
		setResults(results)
        // if (results.length > 0) {
        //     navigate('/flights')
        // }
        // else if (results.length === 0) {
        //     alert("No flights found")
        // }
        navigate('/flights')
	}
	


    return (
		<div className='registerForm'>
            {isLoggedIn ? (
                <div className='registerForm'>
                    <form onSubmit={(e) => handleSearchFlights(e)}>
                        <h1>Browse Flights</h1>
                        <div className='input-field'>
                            <input type='text' placeholder='Origin' value={flightOrigin} onChange={(e)=> setFlightOrigin(e.target.value)}required/>
                            <PiAirplaneTakeoff className='icon'/>
                        </div>
                        <div className='input-field'>
                            <input type='text' placeholder='Destination' value={flightArrival} onChange={(e)=>setFlightArrival(e.target.value)}  required/>
                            <PiAirplaneLanding className='icon' />
                        </div>
                        <div className='input-field'>
                            <input type='date' placeholder='Date' value={flightDate} onChange={(e)=>setFlightDate(e.target.value)} required/>
                        </div>
                        <button type='submit'>Search Flights</button>
                    </form>
                    <FlightResultCard results={results}/>
                </div>
            ) : (
                <div>
                    <div className='registerForm'>
                        <form onSubmit={(e) => handleSearchFlights(e)}>
                            <h1>Welcome Back</h1>
                        <div className='input-field'>
						<input type='text' placeholder='Origin' value={flightOrigin} onChange={(e)=> setFlightOrigin(e.target.value)}required/>
                            <PiAirplaneTakeoff className='icon'/>
                        </div>
                        <div className='input-field'>
							<input type='text' placeholder='Destination' value={flightArrival} onChange={(e)=>setFlightArrival(e.target.value)}  required/>
                            <PiAirplaneLanding className='icon' />
                        </div>
                        <div className='input-field'>
                            <input type='date' placeholder='Date' value={flightDate} onChange={(e) => setFlightDate(e.target.value)} required/>
                        </div>
                            <button type='submit' >Search Flights</button>
                        </form>
                        {/* <FlightResultCard results={results}/> */}
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default Homepage;

