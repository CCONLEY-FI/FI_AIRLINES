import React from 'react';
import { useState, useEffect} from 'react';
import FlightResultCard from './FlightResultCard';
import { useNavigate } from 'react-router-dom';
import Homepage from '../Homepage/Homepage';

const FlightResult = ({results}) => {
    
    
    // const [ allFlights, setAllFlights ] = useState([])
    
    //   useEffect(() => {
	// 	fetch('/flights')
	// 	.then((r) => r.json())
	// 	.then((flights) => setAllFlights(flights))
	//  }, [])

	//  console.log(allFlights)
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
              <h3> {`${results[0]?.origin}`} </h3>
          </div>
          <div className="input-field">
              <label htmlFor="destination">To</label>
              <h3>{`${results[0]?.destination}`}</h3>
          </div>
          <div className="input-field">
              <label htmlFor="date">Departure Date</label>
              <h3>{`${results[0]?.departure_date}`}</h3>
          </div>
		  <div className="input-field">
              <label htmlFor="time">Arrival date</label>
              <h3>{`${results[0].arrival_date}`} </h3>
          </div>
          <div >
              <label htmlFor="time">Departure Time</label>
              <h3> {`${results[0].departure_time}`}</h3>
          </div>
          <div className="input-field">
              <label htmlFor="time">Arrival Time</label>
              <h3>{`${results[0].arrival_time}`} </h3>
          </div>
		  
          <div className="input-field">
              <label htmlFor="flight-number">Flight Number</label>
              <h3> {`${results[0].flight_number}`}</h3>
          </div>
		  
          <button type="submit" className="submit-btn">Save Flight</button>
      </form>
      
  </div>
);
};

export default FlightResult;