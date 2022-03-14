import React, { useEffect, useState } from 'react';
import { Link} from "react-router-dom"

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
  h3: {
    display: 'inline',
    marginLeft: '70px'
  },
  button:
  {
    marginTop: '8px',
    marginLeft: '120px',
    fontSize: '25px'
  },
  logout:
  {
    display: 'inline',
    marginLeft: '10px'
  }
}

export default function Login(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
      <div>
        <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
        <div style={styles.component} className="component">
          <div>
            {props.username ? (
              <div>
                <h5>You are now logged in, {props.loginInfo.username}</h5>
                <Link to="/"><h3 style={styles.h3}>Home</h3></Link>
                <button style={styles.logout} className="button" onClick={props.logMeOut}>LogOut</button>
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
                  {/* <h1>Login</h1>
                <input type="text" value={props.loginInfo.username} onChange={props.handleInputChange} name="username" placeholder="Username" />
                <input type="password" value={props.loginInfo.password} onChange={props.handleInputChange} name="password" placeholder="Password" />
                <button onClick={(e) => {props.logMeIn(e, props.loginInfo.username, props.loginInfo.password)}}>Login</button> */}
              </form>
            )}
              </div>
          </div>
      </div>
      
    );
  }
