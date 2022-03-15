import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div>
      <div className="navigation-bar">
        {props.username ? (
          <div>
            <ul className="nav justify-content-center">
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
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <ul className="nav justify-content-center">
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
                <Link to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {props.username ? (
        <div style={{margin: '0 auto', display: 'flex'}} className="hi-there">
          <h4>Hi there, {props.username}</h4>
          <button style={{display: 'inline-block', marginLeft: '20px'}} onClick={props.logMeOut}>Logout</button>
        </div>
      ) : (null)}
    </div>
  );
}
