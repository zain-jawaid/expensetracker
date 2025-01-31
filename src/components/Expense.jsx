import React, { useEffect } from 'react'
import {FormControl,  InputLabel,  Select,  MenuItem,  TextField, Button} from "@mui/material";
import { useState } from "react";
import Table from './Table';
import { UsetrackerContext } from '../Context/ExpenseContext';
import AddIcon from '@mui/icons-material/Add';
import { Remove } from '@mui/icons-material';


function Expense() {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState();
  const [date, setDate] = useState(null);
  // const [items, setItems] = useState([]);
  const { allData, trackData } = UsetrackerContext();

   function addItem() {
    // console.log(type,category,amount,date);
    const item = {
      type: type,
      category: category,
      amount: amount,
      date: date  ,
    };
    trackData([...allData, item]);
    // console.log([...items,item])
  }

  const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        let inc = allData.reduce((total, item) => {
            if (item.type === "income") {
                total += Number(item.amount);
            }
            return total;
        }, 0);
        setIncome(inc);
        let exp = allData.reduce((total, item) => {
            if (item.type === "expense") {
                total += Number(item.amount);
            }
            return total;
        }, 0);
        setExpense(exp);
        setBalance(Number(inc) - Number(exp));
    }, [allData]);
  const balanceStyle ={
    color: balance < 0 ? 'red' : 'green'
  }


  return (
        <div className="expenseTracker">
        <h1>Expense Tracker</h1>
        <h2 style={{marginTop:'10px'}}>Balance</h2>
        <p style={balanceStyle}>${balance}</p>

        <div className='output'>
        <table >
          <tbody>
            {allData.map((value,index) => {
              return (
                <Table
                addSign = {<AddIcon />}
                subSign = {<Remove />}
                type = {value.type}
                amount = {value.amount}
                category = {value.category}
                date = {value.date}
                index = {index}
                 />
              );
            })}
          </tbody>
        </table>
        </div>
        <div className="section">
          <div className="selectIncome">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Income</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Income"}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="category">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"category"}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                 {type !== 'expense' && <MenuItem value={"Salary"}>Salary</MenuItem>}
                 {type !== 'income' &&<MenuItem value={"Bill"}>Bill</MenuItem>}
                {type !== 'income' &&<MenuItem value={"Car"}>
                  Car
                </MenuItem>}
                {type !== 'income' &&<MenuItem value={"Food"}>
                  Food
                </MenuItem>}
              </Select>
            </FormControl>
          </div>
          <div className="textField1">
            <TextField
              label="Amount"
              className="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className='date'>
            <label for="date" id='dateLabel'>
              Enter Date :
            </label>
            <input type="date" id='date' name="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
          </div>
          <div>
            <Button variant="outlined" className="btn" onClick={addItem}>
              Add New Item
            </Button>
          </div>
        </div>
      </div>
  )
}




export default Expense  
