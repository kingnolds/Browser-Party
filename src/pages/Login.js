import React, { useEffect, useState } from 'react';
import {useParams, useNavigate, Link} from "react-router-dom"
import API from "../utils/api"
// const socket = io("http://localhost:4000");
export default function Login(props) {
    
  return (

      <div>
          <div className='container'>
              <div className='card'>
              {props.username ? (
                <div>
                    <h2>You are now logged in, {props.loginInfo.username}</h2>
                    <Link to="/">Home</Link>
                    <button onClick={props.logMeOut}>LogOut</button>
                    </div>
                ) : (
                    <form>
                    <input value={props.loginInfo.username} onChange={props.handleInputChange} name="username" placeholder="Username"/>
                    <input value={props.loginInfo.password} onChange={props.handleInputChange} name="password" placeholder="Password"/>
                    <button onClick={props.logMeIn}>Login</button>
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
      
    );
  }
