// import React from 'react'
import "./userDash.css";
import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { APIUrl, handleError, handleSuccess } from "../../utils";

const NavigationPanel = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  useEffect(() => {
    const amounts = expenses.map((item) => item.amount);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0);
    const exp =
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;
    setIncomeAmt(income);
    setExpenseAmt(exp);
  }, [expenses]);

  const deleteExpens = async (id) => {
    try {
      const url = `${APIUrl}/expenses/${id}`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "DELETE",
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const addTransaction = async (data) => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);
  return (


    <div id="navigation-panel">
      <div className="user-section">
        Welcome <br /> <h1>{loggedInUser}</h1>
        <hr />
      </div>
      <ul>
        <li>
            <NavLink
              to="/dashboard/userDash"
              className={({ isActive }) => (isActive ? "active" : "nav-links")}
            >
              DASHBOARD
            </NavLink>
        </li>
        <li>

            <NavLink
              to="/dashboard/addRecord"
              className={({ isActive }) => (isActive ? "active" : "nav-links")}
            >
              ADD RECORD
            </NavLink>
        </li>
        <li>
          

            <NavLink
              to="/dashboard/analysis"
              className={({ isActive }) => (isActive ? "active" : "nav-links")}
            >
              ANALYSIS
            </NavLink>
          
        </li>
        <li>

            <NavLink
              to="/dashboard/allTransactions"
              className={({ isActive }) => (isActive ? "active" : "nav-links")}
            >
              ALL TRANSACTION
            </NavLink>
          
        </li>
      </ul>
      <div>
        <hr />
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default NavigationPanel