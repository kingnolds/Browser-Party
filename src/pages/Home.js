import React, { useState } from 'react';
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"

export default function Home(props) {

  let navigate = useNavigate();
  const loginChange = () => {
    let path = `/login`;
    navigate(path);
  }
  const registerChange = () => {
    let path = `/register`;
    navigate(path);
  }

  const styles = {
    logo: {
      margin: '20vh auto 5px auto',
    },
    component:
    {
      width: '370px',
      margin: '0 auto',
      padding: '5px 35px 35px 35px',
    },
    h1:
    {
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '0.8'
    },
    button:
    {
      marginTop: '28px',
      padding: '5px 17px'
    },
  }

  return (
    <div>
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

          </form>
        )} */}
      {/* <div style={styles.logo}> */}
        <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
      {/* </div> */}
      <div style={styles.component} className="component">
        <div className='text-center'>
          <div className="row">
            <div className="col">
              {/* <div style={styles.h1}>Home</div> */}
              <div>
                <button style={styles.button} className="button" type="submit" onClick={loginChange}>Login</button>
              </div>
              <div>
                <button style={styles.button} className="button" type="submit" onClick={registerChange}>Create Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}