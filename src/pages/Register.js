import React, { useState } from 'react';
import {useParams} from "react-router-dom"
import API from '../utils/api';

export default function Register(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const params = useParams();

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
    button:
    {
      marginTop: '8px',
      marginLeft: '110px',
      fontSize: '25px'
    }
    }

  const submitForm = (e) => {
      e.preventDefault()
      API.newUser(username, password).then((data)=> {
          console.log(data)
      }).catch((err)=>{
          console.log(err)
      })
  }

  return (
    <div>
      <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
        <div style={styles.component} className="component">
            <div>
              <form>
                  <div style={styles.form} className="form-group">
                      <label>Username</label>
                      <input style={styles.input} type="username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
                  </div>
                  <div style={styles.form} className="form-group">
                      <label>Password</label>
                      <input style={styles.input} type="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                  </div>
                  <button style={styles.button} className="button" type="submit" onClick={submitForm}>Register</button>
              </form>
            </div>
        </div>

    </div>
  );
}
