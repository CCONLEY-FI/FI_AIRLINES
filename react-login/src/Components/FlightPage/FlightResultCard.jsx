import React from 'react';
import './FlightResult.css';

const FlightResult = ({ results }) => {
 return (
    <div className="result-card">
      <div className="card">
        <div className="card-body">
          <h1 className='card-title'>Flight Result</h1>
          {results.length > 0 ? (
            results.map((flight, index) => (
              <div key={index}>
                <h3>{flight.flight_number}</h3>
                <p>Origin: {flight.origin}</p>
                <p>Destination: {flight.destination}</p>
                <p>Departure Date: {flight.departure_date}</p>
              </div>
            ))
          ) : (
            <p>No flights found</p>
          )}
        </div>
      </div>
    </div>
 );
};

export default FlightResult;


