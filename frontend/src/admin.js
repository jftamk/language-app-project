import React, { useState, useEffect } from "react";
import AdminTable from "./AdminTable";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert } from "@mui/material";

//Init arrays
const list = [];

function ADMIN() {
  const [eng, setENG] = useState(""); //English words
  const [fin, setFIN] = useState(""); //Finnish words
  const [tag, setTAG] = useState(""); //Categories
  const [state, setState] = useState(list); //main list
  const [init, setInit] = useState(""); //Call useEffect on change
  const [alert, setAlert] = useState(""); //Alerts
  const [editing, setediting] = useState(null); //sets editing to ide number so edit is triggered in AdminTable.js
  const [EditEng, setEditEng] = useState(""); //For editing english word
  const [EditFin, setEditFin] = useState(""); // For editing finnish word
  const [EditTag, setEditTAG] = useState(""); // For editing tag
  //Init with the correct list--------------
  useEffect(() => {
    fetch("/Dictionary/All")
      .then((response) => response.json())
      .then((data) => setState(data));
  }, [init]); //For handlesubmit()

  //Add new word to the list-----------------------
  async function handleSubmit(e) {
    //Object with new words
    const data = { eng: eng, fin: fin, tag: tag };
    e.preventDefault();
    //Make checks that all inputs are filled
    if (eng === "") {
      setAlert(
        <Alert variant="filled" severity="error">
          Add english word!
        </Alert>
      );
    } else if (fin === "") {
      setAlert(
        <Alert variant="filled" severity="error">
          Add finnish word!
        </Alert>
      );
    } else if (tag === "") {
      setAlert(
        <Alert variant="filled" severity="error">
          Choose category!
        </Alert>
      );
    } else {
      //Finally, make POST request
      const res = await fetch("/Dictionary", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // data object made before
      });
      const list = await res.json();
      console.log(list);
      //Call new state after adding item to database(updated version with new word)
      const b = init + 1;
      setInit(b);

      //Alert the user that adding was done
      setAlert(
        <Alert
          onClose={() => {
            setAlert("");
          }}
        >
          New word added successfully!
        </Alert>
      );
      setFIN(""); //clear finnish word
      setENG(""); //clear english word
      setTAG(""); //clear tags
      //Remove alert after 3 seconds
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  }

  //Delete word--------------------------------
  async function deleteWord(id) {
    //Update state --> Create list where deleted id is not included
    const ok = [...state].filter((todo) => todo.id !== id);
    setState(ok);
    console.log(id);
    //DELETE request for the backend with selected word id.
    await fetch("/Dictionary/" + id, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
  }

  //Editing word in the list
  async function editWord(id, a, b, c) {
    //Create new state with updated words (updated list)
    const updatedWords = [...state].map((todo) => {
      if (todo.id === id) {
        todo.eng = EditEng;
        todo.fin = EditFin;
        todo.tag = EditTag;
      }
      return todo;
    });
    //Set state with updated values
    setState(updatedWords);
    setediting(null);
    //Object with new inputs
    var data = { eng: EditEng, fin: EditFin, tag: EditTag };

    //Search right word by id and replace with new word
    const res = await fetch("/Dictionary/" + id, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const list = await res.json();
    console.log(list);
  }

  return (
    <div className="Apps">
      <h1>Dictionary</h1>
      <div className="container">
        <div className="settings">
          {/**For adding new word
           *
           */}
          <h2>ADD NEW</h2>
          <div className="listadd">
            <p>ENGLISH: </p>
            <Input
              placeholder="english word"
              type="text"
              name="todo"
              value={eng}
              onChange={(e) => setENG(e.target.value)}
            />
            <p>FINNISH: </p>
            <Input
              placeholder="finnish word"
              type="text"
              name="todo"
              value={fin}
              onChange={(e) => setFIN(e.target.value)}
            />{" "}
            <br></br>{" "}
            <FormControl sx={{ m: 3, width: 150 }}>
              <InputLabel id="simple-select-label">Category</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={tag}
                label="category"
                onChange={(e) => setTAG(e.target.value)}
              >
                <MenuItem value={"Colors"}>Colors</MenuItem>
                <MenuItem value={"Animals"}>Animals</MenuItem>
                <MenuItem value={"Vehicles"}>Vehicles</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
            {alert}
            <br></br>{" "}
            <Button
              variant="contained"
              sx={{ my: 3, width: 200 }}
              onClick={handleSubmit}
            >
              Add to the list
            </Button>
          </div>
          <br></br>
        </div>
        {/**For displaying dictionary*/}
        <div className="listdisplay">
          <h2>DICTIONARY</h2>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>ENGLISH</TableCell>
                  <TableCell>FINNISH</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="center" style={{ width: "10%" }}>
                    Edit
                  </TableCell>
                  <TableCell align="center" style={{ width: "10%" }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.map((index) => {
                  return (
                    <AdminTable
                      key={index.id}
                      eng={index.eng}
                      fin={index.fin}
                      id={index.id}
                      tag={index.tag}
                      EditEng={EditEng}
                      EditFin={EditFin}
                      EditTag={EditTag}
                      editWord={editWord}
                      editing={editing}
                      setediting={setediting}
                      setEditEng={setEditEng}
                      setEditFin={setEditFin}
                      setEditTAG={setEditTAG}
                      deleteWord={deleteWord}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
export default ADMIN;
