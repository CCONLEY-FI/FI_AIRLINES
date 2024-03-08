import React from 'react';
import './FlightResult.css';
//this is just a placeholder for us to use the data from the backend
const flights = [
 { flight_number: 'FI123', date: '2024-10-12', origin: 'DEN', destination: 'CLE' },
 { flight_number: 'FI456', date: '2023-04-02', origin: 'CLE', destination: 'DEN' },
];
const FlightResult = () => {
 return (
    <div className="result-card">
      <div className="card">
        <div className="card-body">
          <h1>Saved Trips</h1>
          {flights.map((flight, index) => (
            <div key={index} className="flight-details">
              <p>Flight Number: {flight.flight_number}</p>
              <p>Date: {flight.date}</p>
              <p>Origin: {flight.origin}</p>
              <p>Destination: {flight.destination}</p>
              <h2>———————</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
 );
};

export default FlightResult;

