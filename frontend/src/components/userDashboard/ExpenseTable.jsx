import React from "react";


const ExpenseTable = ({ expenses, deleteExpens }) => {
  const handleDownloadPDF = () => {
    window.open(`http://localhost:8080/download/pdf/`);
};

const handleDownloadExcel = () => {
    window.open(`http://localhost:8080/download/excel/`);
};


  return (
    
    // isko recent transactions k ui me convert karna hai !!!

    <div className="expense-list">
      {expenses.map((expense, index) => (
        <div key={index} className="expense-item">
          <div className="allTransactions-left">
            <div className="expense-description">{expense.text}</div>
          </div>
          <div className="allTransactions-right">
            <div
              className="expense-amount"
              style={{ color: expense.amount > 0 ? "#27ae60" : "#c0392b" }}
            >
              ₹ {expense.amount}
            </div>

            <button
              className="delete-button"
              onClick={() => deleteExpens(expense._id)}
            >
              <img src="/deleteBtn.png" alt="" />
            </button>
          </div>
        </div>
      ))}


{/* exports buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h3>Export to:</h3>
        <button onClick={handleDownloadPDF} style={{ margin: "5px" }}>
          PDF
        </button>
        <button onClick={handleDownloadExcel} style={{ margin: "5px" }}>
          Excel
        </button>
      </div>
    </div>
  );
};

export default ExpenseTable;
