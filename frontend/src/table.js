import React, { useState, useRef } from "react";
import USER from "./user";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";
function TableComp(props) {
  const { type, name, placeholder } = props;

  return (
    <>
      <TableRow>
        <TableCell>{props.eng}</TableCell>
        <TableCell>
          <Input placeholder={placeholder} type="text" name={name} />
        </TableCell>
      </TableRow>{" "}
    </>
  );
}
export default TableComp;
