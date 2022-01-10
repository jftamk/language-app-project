import React from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
function AdminTable(props) {
  //Take props from admin.js and return as tablebody while mapping the database.
  return (
    <TableRow>
      <TableCell>{props.eng}</TableCell>
      <TableCell>{props.fin}</TableCell>
      <TableCell>{props.tag}</TableCell>
    </TableRow>
  );
}
export default AdminTable;
