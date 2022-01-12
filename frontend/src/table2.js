import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";

function TableComp2(props) {
  const { type, name, placeholder } = props;
  async function afterInput(e) {
    const ab = e.target.value;
    const abc = ab.toLowerCase();
    const removeExtraSpace = (s) => s.trim().split(/ +/).join(" ");

    const a = removeExtraSpace(abc);
    //If input === finnish word from database, call onChanges function in user.js
    if (a === props.eng) {
      props.onChanges(a, props.finnish);
    } else {
      props.onWrong(a, props.finnish);
    }
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <Input
            placeholder={placeholder}
            type="text"
            pattern="[^\s]+"
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
