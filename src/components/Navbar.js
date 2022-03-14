import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div>
      {/* navbar navbar-expand */}
      <div className="navigation-bar">
        {/* <div className="collapse navbar-collapse"> */}
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            {props.username ? (
              <div>
                <li className="nav-item">
                  <Link to="/play">Play</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile">Profile</Link>
                </li>
              </div>
            ) : (
              <div>
                <div>
                  <li className="nav-item">
                    <Link to="/register">Register</Link>
                  </li>
                </div>
                <div>
                  <li className="nav-item">
                    <Link to="/login">Login</Link>
                  </li>
                </div>
              </div>
            )}
          </ul>
        {props.username ? (
          <div>
            <p className="nav-item">Hi there, {props.username}</p>
            <button onClick={props.logMeOut}>Logout</button>
          </div>
        ) : (null)}
        </div>
    </div>
  );
}
