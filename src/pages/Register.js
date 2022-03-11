import React, { useState } from 'react';
import {useParams} from "react-router-dom"
import API from '../utils/api';

export default function Register(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const params = useParams();

    const styles = {
        card:
        {
          borderStyle: 'none',
          borderRadius: '10px',
          background: '#EEEEEE',
          width: '300px',
          margin: '20vh auto',
          padding: '28px'
        },
        button:
        {
          marginTop: '25px',
          fontSize: '20px'
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
          <div style={styles.card} className='container'>
              <div>
                <form>
                    <h1>Register</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="username" className="form-control" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" onClick={submitForm}>Submit</button>
                </form>
              </div>
          </div>

      </div>
    );
  }
