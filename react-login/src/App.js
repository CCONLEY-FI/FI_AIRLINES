import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import Homepage from './Components/Homepage/Homepage';
import FlightPage from './Components/FlightPage/FlightResult';
import NavBar from './Components/NavBar';
import Logout from './Components/RegisterForm/Logout';




function App() {

	const [ results, setResults ] = useState([])
    const [user, setUser]  = useState({})
	const handleLogin = (username, password) => {
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
 	};
    console.log(results)
    useEffect(() => {
        fetch('/check_session').then((response) => {
            if (response.ok) {
                response.json().then((data) => handleLogin(data.username, data.password));
            }
        });
    }, []);
    
 

//  const results = allFlights?.filter((flight) => (
//   flight.origin.toLowerCase().includes(searchQuery.toLowerCase())
//  ))

 return (
    <Router>
		<NavBar user={user}/>
		<Routes>
			<Route path="/" element={<LoginForm user={user} setUser={setUser}/>} />
			<Route path="/register" element={<RegisterForm />} />
			<Route path="/homepage" element={<Homepage results={results} setResults={setResults}
                                                       user={user} setUser={setUser} />} />
			<Route path="/flights" element={<FlightPage results={results} />} />
            <Route path='/logout' element={<Logout user={user} setuser={setUser}/>}/>
		</Routes>
    </Router>
 );
}

export default App;
