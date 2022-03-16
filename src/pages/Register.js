import React from 'react';


export default function Register(props) {

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
      {!props.username ? (
        <div>
        <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
          <div style={styles.component} className="component">
              <div>
                <form>
                    <div style={styles.form} className="form-group">
                        <label>Username</label>
                        <input style={styles.input} className="input" type="username" onChange={props.handleInputChangeRegister} value={props.registerInfo.username} name="username"/>
                    </div>
                    <div style={styles.form} className="form-group">
                        <label>Password</label>
                        <input style={styles.input} className="input" type="password" onChange={props.handleInputChangeRegister} value={props.registerInfo.password} name="password"/>
                    </div>
                    <button style={styles.button} className="button" type="submit" onClick={props.registerSubmit}>Register</button>
                </form>
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
