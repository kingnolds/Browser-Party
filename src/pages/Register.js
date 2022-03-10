import React, { useState } from 'react';
import {useParams} from "react-router-dom"
import API from '../utils/api';

export default function Register(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const params = useParams();

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
          <div className='container'>
              <div className='card'>
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