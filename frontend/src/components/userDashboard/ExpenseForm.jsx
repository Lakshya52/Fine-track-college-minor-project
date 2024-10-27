import React, { useState } from "react";
import { handleError } from "../../utils";
import "../pages.css";

function ExpenseForm({ addTransaction }) {
  const today = new Date().toISOString().split("T")[0];

  const [expenseInfo, setExpenseInfo] = useState({
    amount: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyExpenseInfo = { ...expenseInfo };
    copyExpenseInfo[name] = value;
    setExpenseInfo(copyExpenseInfo);
  };

  const addExpenses = (e) => {
    e.preventDefault();
    const { amount, text } = expenseInfo;
    if (!amount || !text) {
      handleError("Please add transaction Details");
      return;
    }
    addTransaction(expenseInfo);
    setExpenseInfo({ amount: "", text: "" });
  };

  return (
    <div className="container">
      <form className="addrecord-form" onSubmit={addExpenses}>
        <div className="create-trans-divs">
          <label htmlFor="date"> <h2>  
          Date (optional) :
            </h2></label> <br /> 
          <input type="date" defaultValue={today} />
        </div>
        <div className="create-trans-divs">
          <label htmlFor="text"> <h2>  
          Expense Title : 
            </h2> </label> <br />
          <input
            onChange={handleChange}
            type="text"
            name="text"
            placeholder="Enter your Expense Detail..."
            value={expenseInfo.text}
          />
        </div>
        <div className="create-trans-divs">
          <label htmlFor="amount"> <h2>  
          Amount : 
            </h2> </label> 
          <h4>Note : use minus(-) for expenses before entering amount</h4> <br /> 
          <input
            onChange={handleChange}
            type="number"
            name="amount"
            placeholder="Enter your Amount..."
            value={expenseInfo.amount}
          />
        </div>
        <div className="create-trans-divs">
          <label htmlFor="description"> <h2>  
          Description (optional) :
            </h2> </label> <br />
          
          <textarea
            name="description"
            id=""
            style={{ resize: "none" }}
          ></textarea>
        </div>
        <div className="create-trans-divs">
          <button type="submit">SAVE TRANSACTION</button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
