import React, { useState, useEffect } from "react";

//import "./AdminCSS.css";

import Input from "@mui/material/Input";

//Init arrays
//const list = [];

function ADMIN() {
  const [eng, setENG] = useState(""); //Todo items
  const [fin, setFIN] = useState(""); //Todo items
  // const [tag, setTAG] = useState(""); //Todo items
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
            <br></br>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
}
export default ADMIN;
