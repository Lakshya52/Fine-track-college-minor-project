import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";

Chart.register(ArcElement, Tooltip, Legend);

function PieChart({ totalIncome, totalExpenses }) {
  const data = {
    labels: ["Total Income", "Total Expenses"],
    // labels: [],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#c4e0cc", "rgb(244, 67, 54, 0.5)"], 
        hoverBackgroundColor: ["#66bb6a", "#f44336"],
      },
    ],
  };
  useEffect(() => {
    return () => {
      Chart.getChart("0")?.destroy(); // replace '0' with the chart's ID if needed
    };
  }, []);

  return (
    <>
      <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    //   height: '300px', 
      width: '100%',
    }}>
        <div style={{ width: "90%", height: "auto" }}>
          <Pie data={data} id="0" />
        </div>
      </div>
    </>
  );
}

export default PieChart;
