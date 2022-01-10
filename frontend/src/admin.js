import React, { useState, useEffect } from "react";
import AdminTable from "./AdminTable"; //DO THIS NEXT !!!
//import "./AdminCSS.css";
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

//Init arrays
const list = [];

function ADMIN() {
  const [eng, setENG] = useState(""); //Todo items
  const [fin, setFIN] = useState(""); //Todo items
  const [tag, setTAG] = useState(""); //Todo items
  const [state, setState] = useState(list); //main list
  const [init, setInit] = useState("");

  //Init with the todo list--------------
  useEffect(() => {
    fetch("http://localhost:8080/Dictionary/All")
      .then((response) => response.json())
      .then((data) => setState(data));
  }, [init]); //For handlesubmit()

  //Add to do item-----------------------
  async function handleSubmit(e) {
    const data = { eng: eng, fin: fin, tag: tag };
    e.preventDefault();
    const res = await fetch("http://localhost:8080/Dictionary", {
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
    //Call new state after adding item to database
    const b = init + 1;
    setInit(b);
    console.log(list);
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
  }

  //Delete word--------------------------------
  async function deleteWord(id) {
    const ok = [...state].filter((todo) => todo.id !== id);
    const json = JSON.stringify(ok);
    setState(ok); //Update state --> Create list where id is not included
    console.log(id);
    const res = await fetch("http://localhost:8080/Dictionary/" + id, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body data type must match "Content-Type" header
    });
    return await res.json();
  }

  return (
    <div className="Apps">
      <h1>Dictionary</h1>
      <div className="container">
        <div className="settings">
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
              <InputLabel id="demo-simple-select-label">Tag</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tag}
                label="Age"
                onChange={(e) => setTAG(e.target.value)}
              >
                <MenuItem value={"Colors"}>Colors</MenuItem>
                <MenuItem value={"Animals"}>Animals</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
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

        <div classname="listdisplay">
          <h2>DICTIONARY</h2>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ENGLISH</TableCell>
                  <TableCell>FINNISH</TableCell>
                  <TableCell>TAG</TableCell>
                  <TableCell align="center" style={{ width: "10%" }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.map((index) => {
                  return (
                    <AdminTable
                      eng={index.eng}
                      fin={index.fin}
                      id={index.id}
                      tag={index.tag}
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
