import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Optional for tables
import * as XLSX from "xlsx";

const ExpenseTable = ({ expenses, deleteExpens }) => {




  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense Report", 14, 10);
    doc.autoTable({
      head: [["Transaction title", "Amount","Date"]],
      body: expenses.map((expense) => [expense.text, expense.amount, expense.date.split('T')[0]]),
    });
    doc.save("expenses.pdf");
  };





  const exportToExcel = () => {
    
    const worksheet = XLSX.utils.json_to_sheet(
      expenses.map((expense) => ({
        Date: expense.date.split('T')[0],
        Description: expense.text,
        Amount: expense.amount,
      }))
    );

    worksheet['!cols'] = [{ wch: 20 }, { wch: 40 }, { wch: 10 }]; // Adjust column widths if needed
    worksheet['A1'].z = XLSX.SSF.get_table()['mm/dd/yyyy']; // Set date format for column A

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "expenses.xlsx");
  };






  
  return (
    // isko recent transactions k ui me convert karna  hai !!!

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
          {/* Export buttons */}
          {/* Export buttons */}
        </div>
      ))}

      {/* exports buttons */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3>Export to:</h3>
        <button onClick={exportToPDF}>PDF</button>
        <button onClick={exportToExcel} style={{ margin: "5px" }}>
          Excel
        </button>
      </div>
    </div>
  );
};

export default ExpenseTable;
