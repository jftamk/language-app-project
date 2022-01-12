import React, { useState, useEffect } from "react";
import USER from "./user";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";
function TableComp(props) {
  const { type, name, placeholder } = props;

  async function afterInput(e) {
    const ab = e.target.value;
    const abc = ab.toLowerCase();
    const removeExtraSpace = (s) => s.trim().split(/ +/).join(" ");

    const a = removeExtraSpace(abc);
    //If input === finnish word from database, call onChanges function in user.js
    if (a === props.finnish) {
      props.onChanges(a, props.eng);
    } else {
      props.onWrong(a, props.eng);
    }
  }
  return (
    <>
      <TableRow>
        <TableCell>{props.eng}</TableCell>
        <TableCell>
          <Input
            placeholder={placeholder}
            type="text"
            pattern="[^\s]+"
            name={name}
            onBlur={afterInput}
          />
        </TableCell>
      </TableRow>{" "}
    </>
  );
}
export default TableComp;
