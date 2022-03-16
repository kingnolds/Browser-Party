import React from "react";
import { Link } from "react-router-dom";

const styles = {
  hiThere: {
    marginLeft: 'auto', 
    display: 'flex',
    marginBottom: '4px'
  },
  logoutButton: {
    float: 'right',
    fontSize: '15px',
    display: 'flex',
    margin: '6px 10px 0 12px',
    height: '30px',
    width: '65px',
    padding: '0 0 5px 6px'
  }
}

export default function Navbar(props) {
  return (
    <div>
      {props.username ? (
        <div style={styles.hiThere} className="hi-there">
          <p>Hi there, {props.username}</p>
          <button style={styles.logoutButton} className="button" onClick={props.logMeOut}>Logout</button>
        </div>
      ) : (
      // this keeps the positioning of the nav bar the same
      <div style={styles.hiThere} className="hi-there"></div>
      )}
        {props.username ? (
          <div className="navigation-bar-medium">
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
          <div className="navigation-bar-wide">
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
  );
}