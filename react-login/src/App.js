import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm'
import Homepage from './Components/Homepage/Homepage'
import FlightPage from './Components/FlightPage/FlightResult'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NavBar from './Components/NavBar';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar />}>
      <Route index element={<LoginForm />}/>
      <Route path='/register' element={<RegisterForm />}/>
      <Route path='/frontpage' element={<Homepage />}/>
      <Route path='/flights' element={<FlightPage />}/>
    </Route>
  )
)

function App() {
  return (
    <div>
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
