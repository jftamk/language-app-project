import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
function AdminTable(props) {
  //Take props from admin.js and return as tablebody while mapping the database.
  //props.deleteWord --> call admin.js to trigger delete function with current id and the matching word.
  return (
    <TableRow>
      <TableCell>{props.eng}</TableCell>
      <TableCell>{props.fin}</TableCell>
      <TableCell>{props.tag}</TableCell>
      <TableCell>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            props.deleteWord(props.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
export default AdminTable;
