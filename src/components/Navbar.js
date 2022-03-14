import React, { useState } from "react";
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
        
        </div>
        {/* {props.username ? (
          <div>
            Hi there, {props.username}
            <button onClick={props.logMeOut}>Logout</button>
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
        )} 
        // </div> 
          <Link to="/login">Login</Link>
        )}
       </div> */}
    // </div>
  );
}
