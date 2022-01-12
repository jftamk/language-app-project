import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
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
        </IconButton>{" "}
        {props.id === props.editing ? (
          <>
            {" "}
            <Input
              type="text"
              placeholder="English word"
              value={props.EditEng}
              onChange={(e) => props.setEditEng(e.target.value)}
            />{" "}
            <Input
              type="text"
              placeholder="Finnish word"
              onChange={(e) => props.setEditFin(e.target.value)}
            />{" "}
            <FormControl sx={{ m: 3, width: 150 }}>
              <InputLabel id="simple-select-label">Category</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                label="category"
                onChange={(e) => props.setEditTAG(e.target.value)}
              >
                <MenuItem value={"Colors"}>Colors</MenuItem>
                <MenuItem value={"Animals"}>Animals</MenuItem>
                <MenuItem value={"Vehicles"}>Vehicles</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </>
        ) : (
          <br></br>
        )}
        {props.id === props.editing ? (
          <>
            <Button onClick={() => props.editTodo(props.id)}>
              Finish changes
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => props.setediting(null)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => props.setediting(props.id)}>
            <EditIcon />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
export default AdminTable;
