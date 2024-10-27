import React, { useEffect, useState } from 'react';
import NavigationPanel from "../NavigationPanel";
import '../userDash.css'
import { ToastContainer } from "react-toastify";
import ExpenseTable from "../ExpenseTable.jsx";
import { APIUrl, handleError, handleSuccess } from "../../../utils";

const AllTransactions = () => {
  const [expenses, setExpenses] = useState([]);
  

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
  useEffect(() => {
    fetchExpenses();
  }, []);
  return (
    <>
      <div className="DashboardPagesContainer">
        <NavigationPanel />

        <div id="main-content">
          <h2>ALL TRANSACTIONS</h2>
          <ExpenseTable expenses={expenses} deleteExpens={deleteExpens} />
        </div>
      </div>

    </>
  )
};

export default AllTransactions;
