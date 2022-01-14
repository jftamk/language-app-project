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

function AdminTable(props) {
  async function editbutton() {
    //If some input is not changed, keep original.
    if (props.EditEng === "") {
      props.setEditEng(props.eng);
    }

    if (props.EditFin === "") {
      props.setEditFin(props.fin);
    }
    if (props.EditTag === "") {
      props.setEditTAG(props.tag);
    }

    //Then set editing to edit mode by taking id -- props.id===props.editing
    props.setediting(props.id);
  }
  async function changes(e) {
    //First trigger the editWord function in admin.js to make edits for the word.
    await props.editWord(props.id, props.eng, props.fin, props.tag);

    /*After setting new edits, set edit values back to null so they
    can get new values if input is not changed in edit.*/
    props.setEditEng("");
    props.setEditFin("");
    props.setEditTAG("");
  }
  //Take props from admin.js and return as tablebody while mapping the database.

  return (
    <TableRow>
      <TableCell>{props.eng}</TableCell>
      <TableCell>{props.fin}</TableCell>
      <TableCell>{props.tag}</TableCell>
      {/**After edit button clicked, setediting is set (editing==props.id).
       * Take words as input and after clicking Finish changes, call editWord in admin.js */}
      <TableCell>
        {props.id === props.editing ? (
          <>
            {" "}
            <Input
              type="text"
              placeholder="English word"
              defaultValue={props.eng}
              onChange={(e) => props.setEditEng(e.target.value)}
            />{" "}
            <Input
              type="text"
              placeholder="Finnish word"
              defaultValue={props.fin}
              ref={Input}
              onChange={(e) => props.setEditFin(e.target.value)}
            />{" "}
            <FormControl sx={{ my: 2, width: 120 }}>
              <InputLabel id="simple-select-label">{props.tag}</InputLabel>
              <Select
                labelId="simple-select-label"
                defaultValue={props.tag}
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
            <Button variant="contained" sx={{ mb: 2 }} onClick={changes}>
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
          <Button
            variant="contained"
            size="small"
            sx={{ mb: 2 }}
            onClick={editbutton}
          >
            Edit
          </Button>
        )}
      </TableCell>{" "}
      {/** props.deleteWord --> call admin.js function deleteWord
       *  to trigger delete function with current
       *  id and the matching word. */}
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
      </TableCell>{" "}
    </TableRow>
  );
}
export default AdminTable;
