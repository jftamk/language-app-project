import logo from "./logo.svg";
import "./App.css";

import React from "react";

class App extends React.Component {
  state = { locations: [] };
  async componentDidMount() {
    let hr = await fetch("http://localhost:8080/Dictionary");
    let json = await hr.json();
    this.setState({ locations: json });
  }
  render() {
    if (this.state.locations.length === 0) {
      return <p>loading...</p>;
    } else {
      let ui = this.state.locations.map((loc) => (
        <li key={loc.id}>
          {loc.id} - {loc.eng} - {loc.fin}
        </li>
      ));
      return <ul>{ui}</ul>;
    }
  }
}
export default App;
