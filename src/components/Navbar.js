import React, { useState } from "react";
import Home from "../pages/Home";
import Play from "../pages/Play";
import Profile from "../pages/Profile";
// import Login from "../pages/Login";
import Register from "../pages/Register";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div>
      {/* navbar navbar-expand */}
      <div className="navigation-bar">
        {/* <div className="collapse navbar-collapse"> */}
          <ul class="nav justify-content-center">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link to="/play">Play</Link>
            </li>
            <li className="nav-item">
            <Link to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
            <Link to="/register">Register</Link>
            </li>
          </ul>
        {/* {props.userEmail ? (
          <div>
            <h2>Welcome to the club, {props.userEmail}</h2>
            <button onClick={props.logMeOut}>LogOut</button>
          </div>
        ) : (
          <form onSubmit={props.logMeIn}>
            <input
              value={props.loginInfo.email}
              onChange={props.handleInputChange}
              name="email"
            />
            <input
              value={props.loginInfo.password}
              onChange={props.handleInputChange}
              name="password"
            />
            <button>Login</button>
            <button> Create Account</button>
          </form>
        )} */}
        {/* </div> */}
      </div>
    </div>
  );
}
