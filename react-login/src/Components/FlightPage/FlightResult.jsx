import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FlightResult = () => {
    const [flights, setFlights] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    
    const [airline, setAirline] = useState("")

    useEffect(() => {
        fetch(`/api/flights?origin=${origin}&destination=${destination}`)
            .then(response => response.json())
            .then(data => setFlights(data))
            .catch(error => console.error('Error fetching flights:', error));
    }, [origin, destination]); // Dependency array now includes origin and destination to refetch when they change
// hello world
    function handleAirline(e){
      setAirline(e.target.value)
    }

    function handleAirlineSubmit(e){
      e.preventDefault()
      
      console.log(airline)
    }

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
                  <div>
                    <p>No flights available.</p>
                    <form onSubmit={handleAirlineSubmit}>
                      <input type='text' placeholder='Airline' onChange={(e)=>handleAirline(e)}/>
                      
                    </form>
                  </div>
                )}
            </div>
        </div>
    );
};

export default FlightResult;