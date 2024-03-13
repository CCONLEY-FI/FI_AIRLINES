import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FlightResult = ({ results }) => {
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState("");
    const [newTripName, setNewTripName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("/trips")
            .then((response) => response.json())
            .then((data) => setTrips(Array.isArray(data) ? data : []))
            .catch((error) => {
                console.error("Failed to fetch trips:", error);
                setTrips([]); // Ensure trips is reset to an empty array on error
            });
    }, []);
    function handleSelectedTrip(e) {
        setSelectedTrip(e.target.value);
    }


    const handleSaveFlightToTrip = (e) => {
        e.preventDefault();
        console.log(results);
        const bodyData = results[0]
            ? {
                  flightId: results[0].id,
                  tripId: selectedTrip,
                  tripName: newTripName,
              }
            : {};

        if (selectedTrip) {
            bodyData.tripId = selectedTrip;
        } else if (newTripName) {
            bodyData.tripName = newTripName;
        }

        fetch("/save-flight-to-trip", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(bodyData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to save flight to trip");
                }
                return response.json();
            })
            .then(() => {
                alert("Flight saved successfully to Trip!");
                navigate("/homepage");
            })
            .catch((error) => {
                console.error("Error saving flight to trip:", error);
                alert(error.message);
            });
    };

    return (
        <div className='registerForm'>
            <h1>Book Your Flight</h1>
            <form onSubmit={handleSaveFlightToTrip}>
                {/* Display the flight details */}
                <div className='input-field'>
                    <label>From</label>
                    <h3>{results[0]?.origin}</h3>
                </div>
                <div className='input-field'>
                    <label>To</label>
                    <h3>{results[0]?.destination}</h3>
                </div>
                <div className='input-field'>
                    <label>Departure Date</label>
                    <h3>{results[0]?.departure_date}</h3>
                </div>
                <div className='input-field'>
                    <label>Arrival Date</label>
                    <h3>{results[0]?.arrival_date}</h3>
                </div>
                <div className='input-field'>
                    <label>Departure Time</label>
                    <h3>{results[0]?.departure_time}</h3>
                </div>
                <div className='input-field'>
                    <label>Arrival Time</label>
                    <h3>{results[0]?.arrival_time}</h3>
                </div>
                <div className='input-field'>
                    <label>Flight Number</label>
                    <h3>{results[0]?.flight_number}</h3>
                </div>
                {/* Dropdown to select an existing trip */}
                <div className='input-field'>
                    
                    <input
                        type='text'
                        placeholder='New trip name'
                        value={selectedTrip}
                        onChange={(e) => setSelectedTrip(e.target.value)}
                    />
                    {/* <select
                        value={selectedTrip}
                        onChange={(e) => setSelectedTrip(e.target.value)}>
                        <option value=''>Select a trip</option>
                        {trips.map((trip) => (
                            <option key={trip.id} value={trip.id}>
                                {trip.name}
                            </option>
                        ))}
                    </select> */}
                </div>
                {/* Input to create a new trip */}
                <div className='input-field'>
                    <input
                        type='text'
                        placeholder='New trip name'
                        value={newTripName}
                        onChange={(e) => setNewTripName(e.target.value)}
                    />
                </div>
                <button type='submit' className='submit-btn'>
                    Save Flight to Trip
                </button>
            </form>
        </div>
    );
};

export default FlightResult;
