import React, { useState } from 'react';
import {useParams} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"

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
    card:
    {
      background: 'black',
      width: 300,
      height: 200,
    },
    h1:
    {
      color: 'white',
      
    },
    button:
    {

    },
    container:
    {
      // background: 'black',
    },
  }

    return (
      <div>
        <Navbar/>
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
            <div style={styles.card} className='card text-center'>
              <div className="row">
                <div className="col">
                <div style={styles.h1}>Home</div>
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
        </div>
    );
  }