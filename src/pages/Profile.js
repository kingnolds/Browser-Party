import React from 'react';
<<<<<<< HEAD
// import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';


export default function Profile({username}) {
  const [ friends, setFriends] = useState([])
  
  useEffect(()=>{
      API.getSingleUser(username).then(data=>{
        console.log(data)
        setFriends(data.user.friends)
      })
  })
=======
import { Link } from "react-router-dom";
>>>>>>> dev

export default function Profile(loginInfo) {
  const styles = {
    logo: {
      margin: '10vh auto 0px auto',
    },
    component: {
      width: '500px',
      margin: '0 auto',
      padding: '28px'
    }
  }

  return (
    <div>
      <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
      <div style={styles.component} className="component">
        {loginInfo ? (
          <div>
            <h1>{loginInfo.username}</h1>
            <div>
              <div className="card-body">
                <h2>Game history: </h2>
                <ul>
                  <li>insert game here</li>
                </ul>
              </div>
            </div>
<<<<<<< HEAD
            <div>
              <div className="card-body">
                <h2>Friends:</h2>
                <ul>
                  {friends.map(friend=>(
                    <li>{friend}</li>
                  ))}
                </ul>
              </div>
            </div>
=======
>>>>>>> dev
          </div>
        ) : (
          <div>
            You must login first!
            <Link to="/login">Login</Link>
          </div>)}
      </div>
    </div>
  );
}