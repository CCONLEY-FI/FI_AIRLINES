import React, { useState, useEffect } from "react";
import { PiAirplaneTakeoff, PiAirplaneLanding } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import FlightResultCard from "../FlightPage/FlightResultCard";

const Homepage = ({ results, setResults, user, setUser }) => {
    const [flightOrigin, setFlightOrigin] = useState("");
    const [flightArrival, setFlightArrival] = useState("");
    const [flightDate, setFlightDate] = useState("");
    const [allFlights, setAllFlights] = useState([]);
    const [allTrips, setAllTrips] = useState([]);

    const navigate = useNavigate();
    console.log(user);

    useEffect(() => {
        fetch("/flights")
            .then((r) => r.json())
            .then((flights) => setAllFlights(flights))
            .catch((error) => {
                console.error("Error fetching flights", error);
            });
        fetch("/trips")
            .then((r) => r.json())
            .then((trips) => setAllTrips(trips));
    }, []);
    console.log(allTrips);

    const handleSearchFlights = (e) => {
        e.preventDefault();
        const filteredResults = allFlights.filter(
            (flight) =>
                flight.origin
                    .toLowerCase()
                    .includes(flightOrigin.toLowerCase()) &&
                flight.destination
                    .toLowerCase()
                    .includes(flightArrival.toLowerCase()) &&
                flight.departure_date.includes(flightDate)
        );
        setResults(filteredResults);
        navigate("/flights");
    };

    return (
        <div className='registerForm'>
            <div className='registerForm'>
                <form onSubmit={handleSearchFlights}>
                    <h1>Browse Flights</h1>
                    <div className='input-field'>
                        <input
                            type='text'
                            placeholder='Origin'
                            value={flightOrigin}
                            onChange={(e) => setFlightOrigin(e.target.value)}
                            required
                        />
                        <PiAirplaneTakeoff className='icon' />
                    </div>
                    <div className='input-field'>
                        <input
                            type='text'
                            placeholder='Destination'
                            value={flightArrival}
                            onChange={(e) => setFlightArrival(e.target.value)}
                            required
                        />
                        <PiAirplaneLanding className='icon' />
                    </div>
                    <div className='input-field'>
                        <input
                            type='date'
                            value={flightDate}
                            onChange={(e) => setFlightDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' className='submit-btn'>
                        Search Flights
                    </button>
                </form>
                <FlightResultCard results={results} />
                <div>
                    <h1>Trips</h1>
                    <ul>
                        {allTrips
                            .filter((trip) =>
                                user ? trip.user_id === user.id : 0
                            )
                            .map((trip) => (
                                <li key={trip.id}>{trip.name}</li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
