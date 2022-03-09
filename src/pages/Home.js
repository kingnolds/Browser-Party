import React, { useState } from 'react';
import {useParams} from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function Home(props) {

  let navigate = useNavigate(); 
  const loginChange = () =>{ 
    let path = `/login`; 
    navigate(path);
  }
  const registerChange = () =>{ 
    let path = `/register`; 
    navigate(path);
  }

  const styles = {
    button:
    {

    },
    container:
    {
      // background: 'black',
    },
  }

  const params = useParams();
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
          <div style={styles.container} div className="container">
            <div className="row">
              <div className="col text-center">
              <h1>Home</h1>
              <div>
              <button type="submit" className="btn btn-primary btn-block" onClick={loginChange}>Login</button>
            </div>
            <br></br>
            <div>
              <button type="submit" className="btn btn-primary btn-block" onClick={registerChange}>Create Account</button>
            </div>
              </div>
            </div>
          </div>
        </div>
    );
  }