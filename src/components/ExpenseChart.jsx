import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { UsetrackerContext } from "../Context/ExpenseContext.jsx";

function ExpenseChart() {
  const { allData } = UsetrackerContext();
  const expenseArray = allData?.filter((data) => data.type === "expense");
  console.log("expense", expenseArray);

  // Create an empty object to store categories and their total amounts
  // const expenseTotals: { [key: string]: number } = {};
  const expenseTotals = {};
  const totalExpense = expenseArray.reduce((total, entry) => total + Number(entry.amount),0);

  // Loop through each expense entry
  expenseArray.forEach((entry) => {
    const category = entry.category;
    const amount = entry.amount;

    // If the category exists, add to it; otherwise, create a new entry
    if (expenseTotals[category]) {
      expenseTotals[category] += amount;
    } else {
      expenseTotals[category] = amount;
    }
  });

  // Convert the object into an array for the chart
  const expenseChartData = Object.keys(expenseTotals).map((category,index) => {
    const colors = ["#dd2d4a", "#dc2f02", "#9e2a2b"];
    return {
      label: category, // Category name
      value: expenseTotals[category], 
      color: colors[index % colors.length],
    };
  });

  return (
    <div className="expense">
      <h1 style={{color:'#dd2d4a'}}>Expense</h1>
      <p style={{color:'#dd2d4a'}}>${totalExpense}</p>
      <PieChart className="pie"
        series={[
          {
            data: expenseChartData,
            cx: "100%", // Adjust cx for horizontal positioning
            innerRadius: 40,
            outerRadius: 80,
          },
        ]}
        height={300}
        width={200}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "top", horizontal: "middle" },
          },
        }}
      />
    </div>
  );
}
export default ExpenseChart;
