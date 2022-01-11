import React, { useState, useEffect, useRef } from "react";
import TableComp from "./table.js";
import TableComp2 from "./table2.js";
import CorrectTable from "./correct.js";
import WrongTable from "./wrong";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { backdropUnstyledClasses } from "@mui/material";
//Init arrays
const list = [];
var score = 0;

var test = [];

function USER(props) {
  const [state, setState] = useState(list); //main list
  const [category, setCategory] = useState(""); //Category items
  const [urls, setURL] = useState(""); //For selecting category
  const [header, setHeader] = useState(""); //For headers
  const [result, setResult] = useState(""); //For results
  const [again, setAgain] = useState(""); //For trying again, clear all

  //Fetch list with selected category--------------
  useEffect(() => {
    const fetchData = async () => {
      setURL("http://localhost:8080/Dictionary/" + category);
    };

    fetchData();
  }, [category]);

  //Fetch where English visible and Finnish as input
  /**
   * @return {state} with English visible and Finnish as input
   */
  const getEnglish = async () => {
    //Clear after calling
    score = 0;
    setResult("");
    setAgain("");

    //Fetch english list
    const result = await fetch(urls);
    const list = await result.json();
    const ui = list.map((index) => {
      return (
        <>
          <TableComp
            eng={index.eng}
            id={index.id}
            finnish={index.fin}
            classname="textfield"
            placeholder="input the finnish word"
            onChanges={onChanges}
            onWrong={onWrong}
          />{" "}
        </>
      );
    });

    console.log(ui);
    setState(ui);
    //Set headers for table
    setHeader(
      <TableHead>
        <TableRow>
          <TableCell>ENGLISH</TableCell>
          <TableCell>FINNISH</TableCell>
        </TableRow>
      </TableHead>
    );
  };
  //Fetch where Finnish visible and English as input
  const getFinnish = async () => {
    //Clear after calling
    score = 0;
    setResult("");
    setAgain("");

    //Fetch finnish list
    const result = await fetch(urls);
    const list2 = await result.json();
    const ui = list2.map((index) => {
      return (
        <>
          <TableComp2
            eng={index.eng}
            id={index.id}
            finnish={index.fin}
            classname="textfield"
            placeholder="type english"
            onChanges={onChanges}
          />{" "}
        </>
      );
    });
    console.log(ui);
    setState(ui);
    //Set headers for table
    setHeader(
      <TableHead>
        <TableRow>
          <TableCell>ENGLISH</TableCell>
          <TableCell>FINNISH</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  async function onChanges(b, a) {
    test.push({ eng: a, correct: b });
    console.log(b);
    console.log(a);

    score++;
  }

  async function onWrong(b, a) {
    test.push({ eng: a, wrong: b });
    console.log(b);
    console.log(a);
  }

  async function checkresult() {
    console.log(urls);

    const check = "YOUR SCORE:" + score + "/" + state.length;
    setResult(check);
    setAgain(
      <Button variant="contained" sx={{ m: 3, width: 200 }} onClick={TryAgain}>
        Try again
      </Button>
    );
    //Fetch english list
    const result = await fetch(urls);
    const list2 = await result.json();
    console.log(list2);
    const checked = test.map((index) => {
      return (
        <>
          <TableRow>
            <TableCell> {index.eng}</TableCell>

            <TableCell style={{ backgroundColor: "lightgreen" }}>
              {" "}
              {index.correct}
            </TableCell>
            <TableCell style={{ backgroundColor: "#FFD2D2" }}>
              {" "}
              {index.wrong}
            </TableCell>
          </TableRow>
        </>
      );
    });
    setState(checked);
    setHeader(
      <TableHead>
        <TableRow>
          <TableCell>ENGLISH</TableCell>
          <TableCell style={{ backgroundColor: "lightgreen" }}>
            CORRECT
          </TableCell>
          <TableCell style={{ backgroundColor: "#FFD2D2" }}>
            INCORRECT
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  async function TryAgain() {
    //Try again
    //Set the score back to 0
    score = 0;

    setResult("");

    //Find all inputs and set their value back to empty.
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    setAgain("");
  }

  return (
    <div className="Apps">
      <h1>Learn languages!</h1>
      <h2>Translate the words</h2>
      <Button
        variant="contained"
        sx={{ m: 3, width: 200 }}
        onClick={getEnglish}
      >
        From English to Finnish
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ m: 3, width: 200 }}
        onClick={getFinnish}
      >
        From Finnish to English
      </Button>{" "}
      <FormControl sx={{ m: 3, width: 200 }}>
        <InputLabel id="simple-select-label">Category</InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          value={category}
          label="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value={"Colors"}>Colors</MenuItem>
          <MenuItem value={"Animals"}>Animals</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
          <MenuItem value={"All"}>All</MenuItem>
        </Select>
      </FormControl>
      <div classname="listdisplay">
        <div className="dictionary">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              {" "}
              {header}
              <TableBody>{state}</TableBody>
            </Table>
          </TableContainer>{" "}
          {result} {again}
          <Button
            variant="contained"
            sx={{ m: 3, width: 200 }}
            onClick={checkresult}
          >
            Check results
          </Button>
        </div>
      </div>
    </div>
  );
}
export default USER;
/**         {" "} */
