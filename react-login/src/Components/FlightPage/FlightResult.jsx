import React from 'react';

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
      <div className="registerForm">
      <h1>Book Your Flight</h1>
      <form>
          <div className="input-field">
              <label htmlFor="origin">From</label>
              <input type="text" id="origin" name="origin" placeholder="Origin" required />
          </div>
          <div className="input-field">
              <label htmlFor="destination">To</label>
              <input type="text" id="destination" name="destination" placeholder="Destination" required />
          </div>
          <div className="input-field">
              <label htmlFor="date">Departure Date</label>
              <input type="date" id="date" name="date" required />
          </div>
          <button type="submit" className="submit-btn">Save Flight</button>
      </form>
  </div>
);
};

export default FlightResult;