import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FlightResult = () => {
    const [flights, setFlights] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');

    useEffect(() => {
        fetch(`/api/flights?origin=${origin}&destination=${destination}`)
            .then(response => response.json())
            .then(data => setFlights(data))
            .catch(error => console.error('Error fetching flights:', error));
    }, [origin, destination]); // Dependency array now includes origin and destination to refetch when they change

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