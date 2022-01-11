import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";

function TableComp2(props) {
  const { type, name, placeholder } = props;
  async function afterInput(e) {
    const a = e.target.value;
    //If input === finnish word from database, call onChanges function in user.js --> TODO onChanges,user.js
    if (a === props.finnish) {
      props.onChanges(a);
    }
  }
  return (
    <>
      <TableRow>
        <TableCell>
          <Input
            placeholder={placeholder}
            type="text"
            name={name}
            onBlur={afterInput}
          />
        </TableCell>
        <TableCell>{props.finnish}</TableCell>
      </TableRow>{" "}
    </>
  );
}
export default TableComp2;