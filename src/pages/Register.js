import React, { useState } from 'react';
import {useParams} from "react-router-dom"
import API from '../utils/api';

export default function Register(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const params = useParams();

  const styles = {
    logo: {
      margin: '10% auto 0px auto',
    },
    component:
    {
      width: '400px',
      margin: '0 auto auto auto',
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
      borderBottom: '2px solid black',
    },
    button:
    {
      marginTop: '8px',
      marginLeft: '110px',
      fontSize: '25px'
    }
  }

  //   return (
  //     <div>
  //         <div style={styles.card} className='container'>
  //             <div className='card'>
  //             <form>
  //                 <h1>Register</h1>
  //               <input type="text" value={props.registerInfo.username} onChange={props.handleInputChangeRegister} name="username" placeholder="Username" />
  //               <input type="password" value={props.registerInfo.password} onChange={props.handleInputChangeRegister} name="password" placeholder="Password" />
  //               <button onClick={props.registerSubmit}>Register</button>
  //             </form>
  //             </div>
  //         </div>

  //     </div>
  //   );
  // }

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
                        <input style={styles.input} type="username" onChange={props.handleInputChangeRegister} value={props.registerInfo.username} name="username"/>
                    </div>
                    <div style={styles.form} className="form-group">
                        <label>Password</label>
                        <input style={styles.input} type="password" onChange={props.handleInputChangeRegister} value={props.registerInfo.password} name="password"/>
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
