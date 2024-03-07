import React from 'react';
import { useState, useEffect} from 'react';
import FlightResultCard from './FlightResultCard';

const FlightResult = () => {
    
    const [ origin, setOrigin ] = useState("")
    const [ arrival, setArrival ] = useState("")
    const [ flightDate, setFlightDate ] = useState("")
    const [ allFlights, setAllFlights ] = useState([])

    
    useEffect(() => {
		fetch('/flights')
		.then((r) => r.json())
		.then((flights) => setAllFlights(flights))
	 }, [])

	 console.log(allFlights)
	

    return (
      <div className="registerForm">
      <h1>Book Your Flight</h1>
      <form>
          <div className="input-field">
              <label htmlFor="origin">From</label>
              <input type="text" id="origin" name="origin" placeholder="Origin" required />
          </div>
          <div className="input-field">
              <label htmlFor="destination">To</label>
              <input type="text" id="destination" name="destination" placeholder="Destination" required />
          </div>
          <div className="input-field">
              <label htmlFor="date">Departure Date</label>
              <input type="date" id="date" name="date" required />
          </div>
          <button type="submit" className="submit-btn">Save Flight</button>
      </form>
      {/* {savedFlightsList} */}
  </div>
);
};

export default FlightResult;