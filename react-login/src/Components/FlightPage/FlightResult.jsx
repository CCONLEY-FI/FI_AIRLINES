import React from 'react';
import { useState, useEffect} from 'react';
import FlightResultCard from './FlightResultCard';
import { useNavigate } from 'react-router-dom';
import Homepage from '../Homepage/Homepage';

const FlightResult = ({results}) => {
    const [trips, setTrips] = useState([]);
    const [allFlights, setAllFlights] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departure_date, setDeparture_date] = useState("");
    
      useEffect(() => {
		fetch('/flights')
		.then((r) => r.json())
		.then((flights) => setAllFlights(flights))
	 }, [])

	 console.log(allFlights)

    useEffect(() => {
        fetch("/trips")
        .then((r) => r.json())
        .then((trips) => setTrips(trips))
        .catch((error) => console.error("Failed to fetch trips:", error))
    }, []);
     const navigate = useNavigate()
     const handleSaveFlight = (e) => {
        e.preventDefault();
        fetch("/flights", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                origin: origin,
                destination: destination,
                departure_date: departure_date,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to save flight");
                }
                return response.json();
            })
            .then((data) => {
                alert("Flight saved successfully");
                navigate("/homepage");
            })
            .catch((error) => {
                console.error("Error saving flight:", error);
                alert(error.message);
            });
    };
	

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