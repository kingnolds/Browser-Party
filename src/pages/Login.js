import React, { useEffect, useState } from 'react';
import {useParams, useNavigate, Link} from "react-router-dom"
import API from "../utils/api"
// const socket = io("http://localhost:4000");

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
  button:
  {
    marginTop: '25px',
    fontSize: '20px'
  }
}

export default function Login(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (

      <div>
        <div style={styles.card} className='container'>
          <div>
            {props.username ? (
              <div>
                <h2>You are now logged in, {props.loginInfo.username}</h2>
                <Link to="/">Home</Link>
                <button onClick={props.logMeOut}>LogOut</button>
              </div>
            ) : (
              <form>
                  <h1>Login</h1>
                <input type="text" value={props.loginInfo.username} onChange={props.handleInputChange} name="username" placeholder="Username" />
                <input type="password" value={props.loginInfo.password} onChange={props.handleInputChange} name="password" placeholder="Password" />
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
