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
    card:
    {
      borderStyle: 'none',
      borderRadius: '10px',
      background: '#EEEEEE',
      width: '300px',
      margin: '25vh auto',
      padding: '28px'
    },
    h1:
    {
      color: 'black',
      fontSize: '25px',
      fontWeight: '600',
      lineHeight: '0.8'
      // marginTop: '20px'
    },
    button:
    {
      marginTop: '25px',
      fontSize: '20px'
    },
    container:
    {
      // background: 'black',
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

      <div style={styles.card}className="card">
        <div className='text-center'>
          <div className="row">
            <div className="col">
              <div style={styles.h1}>Home</div>
              <div>
                <button style={styles.button} type="submit" className="btn btn-primary btn-block" onClick={loginChange}>Login</button>
              </div>
              {/* <br></br> */}
              <div>
                <button style={styles.button} type="submit" className="btn btn-primary btn-block" onClick={registerChange}>Create Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}