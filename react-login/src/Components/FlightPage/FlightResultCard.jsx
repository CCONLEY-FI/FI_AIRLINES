import React, { useState } from "react";
import "./FlightResult.css";

// Assuming the component now expects a `results` prop based on the Homepage.jsx usage
const FlightResultCard = ({ results = [], fetchTrips }) => {
    const [newTripName, setNewTripName] = useState("");

    // Assuming `flight` is now part of each item in the `results` array
    const handleSaveFlightToTrip = (flightId, tripId) => {
        if (!flightId) {
            console.error("Flight information is missing.");
            return;
        }

        fetch("/save-flight-to-trip", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tripId, flightId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to save flight to trip");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Flight saved to trip:", data);
                fetchTrips(); // Assuming this function updates the trips state in the parent component
            })
            .catch((error) =>
                console.error("Error saving flight to trip:", error)
            );
    };

    const handleCreateAndSaveTrip = (flightId) => {
        if (!newTripName.trim()) {
            alert("Please enter a trip name for a new trip.");
            return;
        }

        fetch("/trips", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newTripName, flight_id: flightId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to create a new trip");
                }
                return response.json();
            })
            .then((data) => {
                console.log("New trip added:", data);
                setNewTripName("");
                fetchTrips(); // Refresh the list of trips
            })
            .catch((error) => console.error("Error adding new trip:", error));
    };

    return (
        <div className='result-card'>
            <div className='card'>
                <div className='card-body'>
                    <h1>Saved Trips</h1>
                    {results.map((flight, index) => (
                        <div
                            key={flight.id || index}
                            className='flight-details'>
                            <p>Flight Number: {flight.flight_number}</p>
                            <p>Date: {flight.date}</p>
                            <p>Origin: {flight.origin}</p>
                            <p>Destination: {flight.destination}</p>
                            <button
                                onClick={() =>
                                    handleSaveFlightToTrip(
                                        flight.id,
                                        flight.tripId
                                    )
                                }>
                                Save to Trip
                            </button>
                            <h2>———————</h2>
                        </div>
                    ))}
                    <div>
                        <input
                            type='text'
                            placeholder='New trip name'
                            value={newTripName}
                            onChange={(e) => setNewTripName(e.target.value)}
                        />
                        {/* Assuming the first flight's ID is used for the demo; adjust as necessary */}
                        <button
                            onClick={() =>
                                handleCreateAndSaveTrip(results[0]?.id)
                            }>
                            Create & Save to New Trip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightResultCard;

