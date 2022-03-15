import React from 'react';
import { Link } from "react-router-dom";

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
      <h1>{loginInfo.username}</h1>
      {/* <Scoreboard/> */}
      <div>
        <div className="card-body">
          <h2>Game history: </h2>
          <ul>
            <li>insert game here</li>
          </ul>
        </div>
        ): (
        <div>
          You must login first!
          <Link to="/login">Login</Link>
        </div>
    </div>
    </div>
  </div>
  );
}