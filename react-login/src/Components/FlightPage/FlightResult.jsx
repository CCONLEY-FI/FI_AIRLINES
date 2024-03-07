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
              <input type="text" id="origin" name="origin" placeholder="Origin"  />
          </div>
          <div className="input-field">
              <label htmlFor="destination">To</label>
              <input type="text" id="destination" name="destination" placeholder="Destination"  />
          </div>
          <div className="input-field">
              <label htmlFor="date">Departure Date</label>
              <input type="date" id="date" name="date"  />
          </div>
          <div className="input-field">
              <label htmlFor="time">Departure Time</label>
              <input type="text" id="departure-time" name="departure-time" placeholder='Departure Time'  />
          </div>
          <div className="input-field">
              <label htmlFor="time">Arival Time</label>
              <input type="text" id="arival-time" name="arival-time" placeholder='Arival Time'  />
          </div>
          <div className="input-field">
              <label htmlFor="flight-number">Flight Number</label>
              <input type="text" id="flight-number" name="flight-number" placeholder='Flight Number'  />
          </div>
          <button type="submit" className="submit-btn">Save Flight</button>
      </form>
      {/* {savedFlightsList} */}
  </div>
);
};

export default FlightResult;