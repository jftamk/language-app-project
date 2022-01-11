import React, { useState, useEffect, useRef } from "react";
import TableComp from "./table.js";
import TableComp2 from "./table2.js";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//Init arrays
const list = [];

function USER(props) {
  const [eng, setENG] = useState(""); //English words
  const [fin, setFIN] = useState(""); //Finnish words
  const [state, setState] = useState(list); //main list
  const [category, setCategory] = useState(""); //Category items
  const [urls, setURL] = useState(""); //For selecting category

  //Fetch list with selected category--------------
  useEffect(() => {
    const fetchData = async () => {
      setURL("http://localhost:8080/Dictionary/" + category);
    };

    fetchData();
  }, [category]);

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
  };

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
  };
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
    </div>
  );
}
export default USER;
/**         {" "} */
