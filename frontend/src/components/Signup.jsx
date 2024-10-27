import React from "react";
import Nav from "./landing/pages/Nav.jsx";
import axios from "axios";
import Footer from './landing/pages/Footer.jsx'
import "./stylesheets/Signup.css";
import { useState } from "react";
import { APIUrl, handleError, handleSuccess } from '../utils.js';

import { Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };




  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }
    try {
      const url = `${APIUrl}/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      // console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <Nav />

      <div id="SignupForm">
        {/* <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#C4E0CC" d="M49.8,-60.8C60.8,-50.2,63.3,-30.9,67.5,-11.3C71.7,8.4,77.6,28.3,70.6,40.9C63.5,53.5,43.4,58.8,25.9,60.6C8.3,62.5,-6.6,60.9,-24.1,58.1C-41.6,55.3,-61.7,51.2,-73.3,38.7C-84.9,26.1,-88.1,5,-84.1,-14.3C-80.1,-33.6,-68.9,-51.2,-53.6,-61C-38.4,-70.7,-19.2,-72.8,0.1,-73C19.4,-73.1,38.9,-71.3,49.8,-60.8Z" transform="translate(100 100)" />
      


      </svg> */}
        <form onSubmit={handleSubmit} method="post">
          <h1>Signup</h1>
          <input
            onChange={handleChange}
            type='text'
            name='name'
            autoFocus
            placeholder="Enter your Name"
            value={signupInfo.name}
            id="SignupEmail"
          />
          <div id="signupFields-container">
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
              className="SignupFields"
              value={signupInfo.email}
            />
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              className="SignupFields"
              value={signupInfo.password}
            />
          </div>
          <button id="submitbtn" type='submit'>SUBMIT</button>
          <span>
            Already have an Account?{" "}
            <Link to="/Login" id="LoginLinkInSignup">
              Login
            </Link>
          </span>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Signup;
