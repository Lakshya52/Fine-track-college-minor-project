// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Navigate, Route, Routes } from 'react-router-dom';
import Landing from "./components/landing/Landing.jsx";
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import UserDashboard from './components/userDashboard/MainDash.jsx';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/dashboard' element={<PrivateRoute element={<UserDashboard />} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
