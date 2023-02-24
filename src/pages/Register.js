import React from 'react';
import logo from '../images/browser-party-logo.png'


export default function Register({username, registerInfo, handleInputChangeRegister, registerSubmit}) {

  const styles = {
    logo: {
      margin: '18vh auto 0px auto',
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
      fontSize: '25px',
      marginBottom: '10px',
      maxWidth: '90%'
    },
    button:
    {
      marginTop: '5px',
      marginLeft: '77px',
      fontSize: '25px'
    }
  }

  return (
    <div>
      <style>
                {`
        cursor: pointer
      `}
            </style>
      {!username ? (
        <div>
        <img style={styles.logo} className="component-logo" alt="Browser Party logo" src={logo}></img>
          <div style={styles.component} className="component">
              <div>
                    <div style={styles.form} className="form-group">
                        <label>Username</label>
                        <input style={styles.input} className="input" type="username" onChange={handleInputChangeRegister} value={registerInfo.username} name="username"/>
                    </div>
                    <div style={styles.form} className="form-group">
                        <label>Password</label>
                        <input style={styles.input} className="input" type="password" onChange={handleInputChangeRegister} value={registerInfo.password} name="password"/>
                    </div>
                    <button style={styles.button} className="button" type="submit" onClick={registerSubmit}>Register</button>
              </div>
          </div>
        </div>
      ):(
        <div>
        <img style={styles.logo} className="component-logo" alt="Browser Party logo" src={logo}></img>
          <div style={styles.component} className="component">
              <div>
                <h3>Congrats! You are now logged in as {username}.</h3>
              </div>
          </div>
        </div>

      )}

    </div>
  );
}
