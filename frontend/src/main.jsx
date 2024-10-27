import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Error from './Error.jsx'
import { useState } from 'react';


import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

import AddRecord from './components/userDashboard/pages/AddRecord.jsx'
import AllTransactions from './components/userDashboard/pages/AllTransactions.jsx'
import Analysis from './components/userDashboard/pages/Analysis.jsx'


import { Navigate, Route, Routes } from 'react-router-dom';
import './index.css'
import UserDashboard from './components/userDashboard/MainDash.jsx';

import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";


const PrivateRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return isAuthenticated ? element : <Navigate to="/login" />
  }
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>
  },
  {
    path: "login/",
    element: <Login/>,
  },
  {
    path: "Signup/",
    element: <Signup/>,
  },
  {
    path: "dashboard/userDash",
    element: <UserDashboard/>,
  },
  {
    path: "dashboard/addRecord",
    element: <AddRecord/>,
  },
  {
    path: "dashboard/allTransactions",
    element: <AllTransactions/>,
  },
  {
    path: "dashboard/analysis",
    element: <Analysis/>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
