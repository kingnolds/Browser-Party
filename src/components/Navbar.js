import React, { useState } from "react";
import Home from "../pages/Home";
import Play from "../pages/Play";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div>
      <div className="NavBar">
        <h4>Navbar</h4>
        <Link to="/">Home</Link>
        <Link to="/play">Play</Link>
        <Link to="/profile">Profile</Link>
        {props.userEmail ? (
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
          </form>
        )}
      </div>
    </div>
  );
}
