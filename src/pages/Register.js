import React, { useState } from 'react';
import {useParams} from "react-router-dom"
import API from '../utils/api';

export default function Register(props) {
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const params = useParams();

    // const submitForm = (e) => {
    //     e.preventDefault()
    //     API.createUser(username, password)
    //     .then((data)=> {
    //         console.log(data)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }

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

    return (
      <div>
          <div style={styles.card} className='container'>
              <div className='card'>
              <form>
                  <h1>Register</h1>
                <input type="text" value={props.registerInfo.username} onChange={props.handleInputChangeRegister} name="username" placeholder="Username" />
                <input type="password" value={props.registerInfo.password} onChange={props.handleInputChangeRegister} name="password" placeholder="Password" />
                <button onClick={props.registerSubmit}>Register</button>
              </form>
              </div>
          </div>

      </div>
    );
  }
