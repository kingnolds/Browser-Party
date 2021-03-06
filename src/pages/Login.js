import React from 'react';
import { Link} from "react-router-dom"

const styles = {
  logo: {
    margin: '18vh auto 5px auto',
  },
  component:
  {
    width: '333px',
    margin: '0 auto auto auto',
    padding: '26px',

  },
  form: {
    fontSize: '25px',
    marginLeft: '-8px'
  },
  input:
  {
    border: '1px solid black',
    marginBottom: '10px',
  },
  h3: {
    display: 'inline',
    marginLeft: '70px'
  },
  logout:
  {
    display: 'inline',
    marginLeft: '10px'
  }
}

export default function Login(props) {

  return (
      <div>
        <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
        <div style={styles.component} className="component">
          <div>
            {props.username ? (
              <div>
                <h2>You are now logged in, {props.username}</h2>
                <Link to="/">Home</Link>
                <button style={styles.button} className="button" onClick={props.logMeOut}>LogOut</button>
              </div>
            ) : (
              <form>
                <div style={styles.form} className="form-group">
                  <label>Username</label>
                  <input style={styles.input} className="input" type="text" value={props.loginInfo.username} onChange={props.handleInputChange} name="username"/>
                </div>
                <div  style={styles.form} className="form-group">
                  <label>Password</label>
                  <input style={styles.input} className="input" type="password" value={props.loginInfo.password} onChange={props.handleInputChange} name="password"/>
                  <button style={{marginTop: '9px', marginLeft: '98px', fontSize: '25px'}} className="button" onClick={props.logMeIn}>Login</button>
                </div>
              </form>
            )}
              </div>
          </div>
      </div>
      
    );
  }
