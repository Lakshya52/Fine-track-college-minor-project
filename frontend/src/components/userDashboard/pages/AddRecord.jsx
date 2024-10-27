// import React from "react";
import React, { useEffect, useState } from "react";
import ExpenseForm from "../ExpenseForm.jsx";

import NavigationPanel from "../NavigationPanel";
import '../userDash.css'
import { APIUrl, handleError, handleSuccess } from "../../../utils";


const AddRecord = () => {
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
  return (
    <>
      <div className="DashboardPagesContainer">
        <NavigationPanel />

        <div id="main-content">
          <h2>CREATE TRANSACTIONS</h2>
          <ExpenseForm addTransaction={addTransaction} />
        </div>
      </div>
    </>
  );
};

export default AddRecord;
