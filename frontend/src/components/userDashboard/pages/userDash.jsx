import NavigationPanel from "../NavigationPanel";
import "../userDash.css";
// import { ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";

import ExpenseDetails from "../ExpenseDetails.jsx";
import { APIUrl, handleError, handleSuccess } from "../../../utils";


import PieChart from '../../PieChart';






const Dashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);
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

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <div className="DashboardPagesContainer">
        <NavigationPanel />

        <div id="main-content">
          <h2>DASHBOARD</h2>
          <div id="dash-top-panels">
            {/* balance, income, expense */}
            <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />

            {/* add transaction section */}
            {/* <ExpenseForm addTransaction={addTransaction} /> */}

            {/* recent transactions / history */}
            {/* <ExpenseTable expenses={expenses} deleteExpens={deleteExpens} /> */}
            {/* <ToastContainer /> */}
          </div>

          <div id="dash-hero" className="flex">
            <div id="pie-chart">
              <div className="dti-title">Pie-chart</div>
              <PieChart totalIncome={incomeAmt} totalExpenses={expenseAmt} />
            </div>
            <img src="/dashboard.svg" alt="dashboard ui image" />
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default Dashboard ;
