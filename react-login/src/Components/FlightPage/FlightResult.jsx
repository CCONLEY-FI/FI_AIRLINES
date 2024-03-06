import React, { useState, useEffect } from 'react';

const FlightResult = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        fetch('/api/flights')
            .then(response => response.json())
            .then(data => setFlights(data))
            .catch(error => console.error('Error fetching flights:', error));
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <div className='flight'>
                {flights.length > 0 ? (
                    flights.map(flight => (
                        <div key={flight.id}>
                            {/* Display flight details */}
                            Flight Number: {flight.flight_number}, Origin: {flight.origin}, Destination: {flight.destination}
                        </div>
                    ))
                ) : (
                    <p>No flights available.</p>
                )}
            </div>
        </div>
    );
};

export default FlightResult;