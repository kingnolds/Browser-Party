import React, { useState } from 'react';
import {useParams} from "react-router-dom"
import API from "../utils/api"

export default function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // const styles = {
    
  // }

  const login = (e) => {
    e.preventDefault();
    API.login(username, password).then((data)=> {
      console.log(data)
  }).catch((err)=>{
      console.log(err)
  })
  }

  const params = useParams();
    return (
      <div>
          <div className='container'>
              <div className='card'>
              <form className="login-form">
                    <h1>Login</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter Username" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter Password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" onSubmit={login}>Submit</button>
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