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
      <div className="navbar navbar-expand navbar-light bg-light">
        <a className="navbar-brand"><h4>Browser Party</h4></a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item active">
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
        
        </div>
        {props.username ? (
          <div>
            Hi there, {props.username}
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
