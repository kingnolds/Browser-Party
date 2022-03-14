import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom"
import API from "../utils/api"
import loggedIn from "../App"

// const socket = io("http://localhost:4000");

const styles = {
  logo: {
    margin: '20vh auto 0px auto',
  },
  component:
  {
    width: '400px',
    margin: '0 auto',
    padding: '28px',

  },
  form: {
    fontSize: '25px',
    marginLeft: '12px'
  },
  input:
  {
    fontSize: '25px',
    marginBottom: '15px',
    border: '1px solid black',
  },
  button:
  {
    marginTop: '8px',
    marginLeft: '120px',
    fontSize: '25px'
  }
}

export default function Login(props) {

  return (
    // <body>
      <div>
        <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
        <div style={styles.component} className="component">
          <div>
            {props.username ? (
              <div>
                <h2>You are now logged in, {props.loginInfo.username}</h2>
                <Link to="/">Home</Link>
                <button style={styles.button} className="button" onClick={props.logMeOut}>LogOut</button>
              </div>
            ) : (
              <form>
                <div style={styles.form} className="form-group">
                  <label>Username</label>
                  <input style={styles.input} type="text" value={props.loginInfo.username} onChange={props.handleInputChange} name="username"/>
                </div>
                <div  style={styles.form} className="form-group">
                  <label>Password</label>
                  <input style={styles.input} type="password" value={props.loginInfo.password} onChange={props.handleInputChange} name="password"/>
                  <button style={styles.button} className="button" onClick={props.logMeIn}>Login</button>
                </div>
              </form>
            )}
            {/* <form className="login-form">
                    <h1>Login</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={props.loginInfo.username} onChange={props.handleInputChange} name="username" className="form-control" placeholder="Enter Username" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={props.loginInfo.password} onChange={props.handleInputChange} name="password" className="form-control" placeholder="Enter Password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" onSubmit={props.logMeIn}>Login</button>
                    <button type="submit" className="btn btn-primary btn-block" onSubmit={props.logMeOut}>Logout</button>
                </form> */}
          </div>
        </div>
      </div>
    // </body>
  );
}