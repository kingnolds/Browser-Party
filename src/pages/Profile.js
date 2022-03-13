import React from 'react';
// import { useParams } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";

export default function Profile() {

  const styles = {
    card:
    {
      borderStyle: 'none',
      borderRadius: '10px',
      background: '#EEEEEE',
      width: '500px',
      margin: '12vh auto',
      padding: '28px'
    },
  }

  // const params = useParams();
  return (
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
  );
}