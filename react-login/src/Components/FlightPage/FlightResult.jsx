import React from 'react';
import { useState, useEffect} from 'react';
import FlightResultCard from './FlightResultCard';
import { useNavigate } from 'react-router-dom';

const FlightResult = () => {
    
    const [ origin, setOrigin ] = useState("")
    const [ destination, setDestination ] = useState("")
    const [ departureDate, setDepartureDate ] = useState("")
    const [ allFlights, setAllFlights ] = useState([])

    
    useEffect(() => {
		fetch('/flights')
		.then((r) => r.json())
		.then((flights) => setAllFlights(flights))
	 }, [])

	 console.log(allFlights)
     const navigate = useNavigate()
     const handleSaveFlight = () => {
        navigate('/homepage')
     }
	

    return (
      <div className="registerForm">
      <h1>Book Your Flight</h1>
      <form onSubmit={handleSaveFlight}>
          <div className="input-field">
              <label htmlFor="origin">From</label>
              <h3 type="text" id="origin" name="origin" placeholder="Origin" value={setOrigin}> Origin </h3>
          </div>
          <div className="input-field">
              <label htmlFor="destination">To</label>
              <h3 type="text" id="destination" name="destination" placeholder="Destination" value={setDestination}>Destination</h3>
          </div>
          <div className="input-field">
              <label htmlFor="date">Departure Date</label>
              <h3 type="date" id="date" name="date"  value={setDepartureDate}>Departure Date</h3>
          </div>
		  {/* static vars */}
          <div >
              <label htmlFor="time">Departure Time</label>
              <h3> Departure Time</h3>
          </div>
          <div className="input-field">
              <label htmlFor="time">Arrival Time</label>
              <h3> Arrival Time</h3>
          </div>
		  
          <div className="input-field">
              <label htmlFor="flight-number">Flight Number</label>
              <h3> Flight Number</h3>
          </div>
		  {/* end of static vars*/}
          <button type="submit" className="submit-btn">Save Flight</button>
      </form>
      {/* {savedFlightsList} */}
  </div>
);
};

export default FlightResult;