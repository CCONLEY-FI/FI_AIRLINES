import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import Homepage from './Components/Homepage/Homepage';
import FlightPage from './Components/FlightPage/FlightResult';
import NavBar from './Components/NavBar';



function App() {
 const handleLogin = (username, password) => {
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
 };

 useEffect(() => {
    fetch('/check_session').then((response) => {
      if (response.ok) {
        response.json().then((data) => handleLogin(data.username, data.password));
      }
    });
 }, []);

 return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/flights" element={<FlightPage />} />
      </Routes>
    </Router>
 );
}

export default App;
