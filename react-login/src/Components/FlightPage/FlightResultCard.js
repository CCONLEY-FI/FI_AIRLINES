import React, { useState, useEffect } from "react";
import "./FlightResult.css";

const FlightResultCard = ({ results = [] }) => {
    const [trips, setTrips] = useState([]);
    const [newTripName, setNewTripName] = useState("");
    const [selectedTrip, setSelectedTrip] = useState("");

    // Define the fetchTrips function inside the component
    const fetchTrips = () => {
        return fetch("/trips")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                return response.json();
            })
            .then((data) => (Array.isArray(data) ? data : []))
            .catch((error) => {
                console.error("Failed to fetch trips:", error);
                return [];
            });
    };

    // Use the local fetchTrips function to fetch and set trips data
    useEffect(() => {
        fetchTrips().then((data) => setTrips(data));
    }, []); // Removed fetchTrips from dependency array since it's defined within the component

    const handleSaveFlightToTrip = (flightId) => {
        const payload = { flightId: flightId, tripName: newTripName};

        if (selectedTrip) {
            payload.tripId = selectedTrip;
        } else if (newTripName.trim()) {
            payload.tripName = newTripName;
        } else {
            alert("Please select a trip or enter a new trip name.");
            return;
        }

        fetch("/save-flight-to-trip", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Failed to save flight to trip or to create a new trip"
                    );
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                setNewTripName(""); // Reset for next use
                setSelectedTrip(""); // Reset selected trip
                alert("Flight saved successfully to trip!");
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div className='result-card'>
            <div className='card'>
                <div className='card-body'>
                    <h1>Flight Results</h1>
                    {results.map((flight, index) => (
                        <div
                            key={flight.id || index}
                            className='flight-details'>
                            <p>Flight Number: {flight.flight_number}</p>
                            <p>Date: {flight.departure_date}</p>
                            {/* Some other relevant details here */}
                            <div>
                                {/* Dropdown for selecting an existing trip */}
                                <select
                                    value={selectedTrip}
                                    onChange={(e) =>
                                        setSelectedTrip(e.target.value)
                                    }>
                                    <option value=''>Select a trip</option>
                                    {trips.map((trip) => (
                                        <option key={trip.id} value={trip.id}>
                                            {trip.name}
                                        </option>
                                    ))}
                                </select>
                                or
                                {/* Input for entering a new trip name */}
                                <input
                                    type='text'
                                    placeholder='New trip name'
                                    value={newTripName}
                                    onChange={(e) =>
                                        setNewTripName(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                onClick={() =>
                                    handleSaveFlightToTrip(
                                        flight.id
                                        )
                                }>
                                Save to Trip
                            </button>
                            <h2>———————</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FlightResultCard;
