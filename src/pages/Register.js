import React from 'react';


export default function Register({username, registerInfo, handleInputChangeRegister, registerSubmit}) {

  const styles = {
    logo: {
      margin: '18vh auto 0px auto',
    },
    component:
    {
      width: '400px',
      margin: '0 auto auto auto',
      padding: '28px',
    },
    form: {
      fontSize: '25px',
      marginLeft: '20px'
    },
    input:
    {
      fontSize: '25px',
      marginBottom: '15px',
    },
    button:
    {
      marginTop: '8px',
      marginLeft: '110px',
      fontSize: '25px',
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
        <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
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
                    <button style={styles.button} className="button" type="submit" onClick={registerSubmit} onTouchStart={registerSubmit}>Register</button>
              </div>
          </div>
        </div>
      ):(
        <div>
        <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
          <div style={styles.component} className="component">
              <div>
                <h3>Can't register while already logged in.</h3>
              </div>
          </div>
        </div>

      )}

    </div>
  );
}
