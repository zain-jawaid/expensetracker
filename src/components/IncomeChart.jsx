import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { UsetrackerContext } from '../Context/ExpenseContext.jsx';

function IncomeChart() {
    
    const { allData } = UsetrackerContext();
    const incomeArray = allData?.filter((data) => data.type === "income");
    console.log("income", incomeArray);

    // Create an empty object to store categories and their total amounts
    // const incomeTotals: { [key: string]: number } = {};
    const incomeTotals = {};
    const totalIncome = incomeArray.reduce((total, entry) => total + Number(entry.amount),0);

    // Loop through each income entry
    incomeArray.forEach((entry) => {
        const category = entry.category;
        const amount = entry.amount;

        // If the category exists, add to it; otherwise, create a new entry
        if (incomeTotals[category]) {
            incomeTotals[category] += amount;
        } else {
            incomeTotals[category] = amount;
        }
    });

    // Convert the object into an array for the chart
    const incomeChartData = Object.keys(incomeTotals).map((category,index) => {
        const color = '#0077b6';
        return {
            label: category,  // Category name
            value: incomeTotals[category],  // Total amount for that category
            color : color,
        };
    });
    return (
        < div className='income'>
        <h1 style={{color:'#0077b6'}}>Income</h1>
        <p style={{color:'#0077b6'}}>${totalIncome}</p>
        <PieChart className='pie'
        series={[
            {
                data: incomeChartData,
                cx: "100%", // Adjust cx for horizontal positioning
                innerRadius: 40,
                outerRadius: 80,
            },
            
        ]}
        height={300}
        width={200}
        slotProps={{
            legend: { direction: 'row', position: { vertical: 'top', horizontal: 'middle' } }
            }}
            />
            </div>
    );
}
export default IncomeChart