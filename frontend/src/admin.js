import React, { useState, useEffect } from "react";

//import "./AdminCSS.css";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//Init arrays
//const list = [];

function ADMIN() {
  const [eng, setENG] = useState(""); //Todo items
  const [fin, setFIN] = useState(""); //Todo items
  const [tag, setTAG] = useState(""); //Todo items
  //const [state, setState] = useState(list); //main list
  // const [init, setInit] = useState("");

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
            <br></br>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
}
export default ADMIN;
