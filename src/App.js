import "./App.css";
import Expense from "./components/Expense.jsx"
import Income from "./components/IncomeChart.jsx";
import Salary from "./components/ExpenseChart.jsx";

function App() {
  return (
    <div className="App">
      <Income />
      <Expense />
      <Salary />
    </div>
  );
}

export default App;
