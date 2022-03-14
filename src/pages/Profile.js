import React from 'react';
// import { useParams } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";

export default function Profile({username}) {


  const styles = {
    card:
    {
      borderStyle: 'none',
      borderRadius: '10px',
      background: '#9E8FB2',
      filter: 'drop-shadow(5px 5px 5px #D3C3AD)',
      width: '500px',
      margin: '12vh auto',
      padding: '28px'
    },
  }

  return (
    <div>
      {username ? (
        <div>
          <div style={styles.card}>
            <h1>Profile</h1>
            <div>
              <div className="card-body">
                <h2>Username</h2>
                <a href="">Edit Username</a>
              </div>
            </div>
            {/* <Scoreboard/> */}
            <div>
              <div className="card-body">
                <h2>Game history: </h2>
                <ul>
                  <li>insert game here</li>
                </ul>
              </div>
            </div>
            <div>
              <div className="card-body">
                <h2>Friends:</h2>
                <ul>
                  <li>insert friend here</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
        ): (
        <div>
          You must login first!
          <Link to="/login">Login</Link>
        </div>

      )}
    </div>
  );
}