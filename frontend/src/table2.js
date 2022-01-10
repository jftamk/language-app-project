import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";

function TableComp2(props) {
  const { type, name, placeholder } = props;

  return (
    <>
      <TableRow>
        <TableCell>
          <Input placeholder={placeholder} type="text" name={name} />
        </TableCell>
        <TableCell>{props.finnish}</TableCell>
      </TableRow>{" "}
    </>
  );
}
export default TableComp2;
