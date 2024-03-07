import React from 'react';
import { useState, useEffect} from 'react';
import FlightResultCard from './FlightResultCard';

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
	

    return (
      <div className="registerForm">
      <h1>Book Your Flight</h1>
      <form>
          <div className="input-field">
              <label htmlFor="origin">From</label>
              <input type="text" id="origin" name="origin" placeholder="Origin" value={setOrigin} />
          </div>
          <div className="input-field">
              <label htmlFor="destination">To</label>
              <input type="text" id="destination" name="destination" placeholder="Destination" value={setDestination} />
          </div>
          <div className="input-field">
              <label htmlFor="date">Departure Date</label>
              <input type="date" id="date" name="date"  value={setDepartureDate}/>
          </div>
		  {/* static vars */}
          <div >
              <label htmlFor="time">Departure Time</label>
              <h2> Departure Time</h2>
          </div>
          <div className="input-field">
              <label htmlFor="time">Arrival Time</label>
              <h2> Arrival Time</h2>
          </div>
		  
          <div className="input-field">
              <label htmlFor="flight-number">Flight Number</label>
              <h2> Flight Number</h2>
          </div>
		  {/* end of static vars*/}
          <button type="submit" className="submit-btn">Save Flight</button>
      </form>
      {/* {savedFlightsList} */}
  </div>
);
};

export default FlightResult;