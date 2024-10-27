import React from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ExpenseTable from "./ExpenseTable.jsx";
import ExpenseDetails from "./ExpenseDetails.jsx";
import ExpenseForm from "./ExpenseForm.jsx";

import Dashboard from "./pages/userDash.jsx";
import AddRecord from "./pages/AddRecord";
import Analysis from "./pages/Analysis";
import AllTransactions from "./pages/AllTransactions";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function UserDashboard() {
 

  return (
    <>
      {/* <div>
      <div className="user-section">
        Welcome <br /> <h1>{loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />

      <ExpenseForm addTransaction={addTransaction} />

      <ExpenseTable expenses={expenses} deleteExpens={deleteExpens} />
      <ToastContainer />
    </div> */}

      {/* <div id="dash-wrapper">
        <div id="main-content"> */}
          <Routes>
            {/* <Route path="/" element={<Navigate to="/dashboard/userDash" />} /> */}
            <Route path="/" element={<Dashboard/>} />
            <Route path="/dashboard/userDash" element={<Dashboard />} />
            <Route path="/dashboard/addRecord" element={<AddRecord />} />
            <Route path="/dashboard/analysis" element={<Analysis />} />
            <Route
              path="/dashboard/allTransactions"
              element={<AllTransactions />}
            />
          </Routes>
      {/* <ToastContainer/> */}
        {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default UserDashboard;
