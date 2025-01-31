import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { UsetrackerContext } from "../Context/ExpenseContext";

function Table(props) {
  const { allData, trackData } = UsetrackerContext();

  const deleteItem = (i) => {
    // const updatedData = [...allData.slice(0, i), ...allData.slice(i + 1)];
    const updatedData = allData.filter((_, index) => index !== i);
    trackData(updatedData);
  };

  return (
    <tr key={props.index}>
      {props.type === "income" && <td style={{color:'green'}}>{props.addSign}</td>}
      {props.type === "expense" && <td style={{color:'red'}}>{props.subSign}</td>}
      {/* <td>{props.type}</td> */}
      <td>${props.amount}</td>
      <td>{props.category}</td>
      <td>{props.date}</td>
      <td>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => deleteItem(props.index)}
        >
          <DeleteIcon />
        </IconButton>
      </td>
    </tr>
  );
}

export default Table;
