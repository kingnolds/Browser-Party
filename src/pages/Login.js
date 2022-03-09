import React, { useState } from 'react';
import {useParams} from "react-router-dom"

export default function Login(props) {

  const styles = {
    
  }

  const params = useParams();
    return (
      <div>
          <div className='container'>
              <div className='card'>
              <form>
                    <h1>Login</h1>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter Password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
              </div>
          </div>


        {/* <div>
          {props.userEmail ? (
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
            <button>Login</button>
            <button> Create Account</button>
          </form>
        )}
        </div> */}
      </div>
    );
  }