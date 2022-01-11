import React, { useState, useEffect, useRef } from "react";
import TableComp from "./table.js";
import TableComp2 from "./table2.js";

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
//Init arrays
const list = [];
var score = 0;
function USER(props) {
  const [eng, setENG] = useState(""); //English words
  const [fin, setFIN] = useState(""); //Finnish words
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
  const getEnglish = async () => {
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

  async function onChanges(b) {
    //  console.log(b);

    score++;
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
  }
  //Try again -- clear all
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
        color="error"
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
              {state}
              {result}
              {again}
            </Table>
          </TableContainer>
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
