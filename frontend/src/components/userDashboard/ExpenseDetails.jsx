import React from "react";
import '../pages.css'

function ExpenseDetails({ incomeAmt, expenseAmt }) {
  return (
    <div>
      {/* Show Income & Expense amount */}

      <div id="amounts-container">
        <div className="dash-top-indicators">
          <div className="dti-title">Balance</div>
          <div className="dti-amount">₹{incomeAmt - expenseAmt}</div>
        </div>
        <div className="dash-top-indicators">
          <div className="dti-title">Income</div>
          <div className="dti-amount">₹{incomeAmt}</div>
        </div>
        <div className="dash-top-indicators">   
          <div className="dti-title">Expense</div>
          <div className="dti-amount">₹{expenseAmt}</div>
        </div>
      </div>
      
    </div>
  );
}

export default ExpenseDetails;
