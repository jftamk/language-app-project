import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import ADMIN from "./admin";
import USER from "./user";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">|Main|</Link>
            </li>
            <li>
              <Link to="/admin">|ADMIN|</Link>
            </li>
            <li>
              <Link to="/user">|USER|</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <br></br>
                <h1>Language APP</h1>
                <h2>Welcome!</h2>
                <h3>
                  If you are admin, move to the ADMIN site. If you are user,
                  move to the USER site. <br></br>
                </h3>
              </>
            }
          />

          <Route path="admin/*" element={<ADMIN />} />
          <Route path="user/*" element={<USER />} />
          <Route
            path="*"
            element={
              <h1 style={{ color: "red" }}>PAGE NOT FOUND! Incorrect input.</h1>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
