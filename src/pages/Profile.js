import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";

export default function Profile() {

  const params = useParams();
  return (
    <div>
      <h1>Profile</h1>
      <div className="card" style={{ width: "500px", margin: "20px" }}>
        <div className="card-body">
          <h2>Username</h2>
          <a href="">Edit Username</a>
        </div>
      </div>
      <Scoreboard />
      <div className="card" style={{ width: "500px", margin: "20px" }}>
        <div className="card-body">
          <h2>Game history: </h2>
          <ul>
            <li>insert game here</li>
            <li>insert game here</li>
            <li>insert game here</li>
          </ul>
        </div>
      </div>
      <div className="card" style={{ width: "500px", margin: "20px" }}>
        <div className="card-body">
          <h2>Friends:</h2>
          <ul>
            <li>insert friend here</li>
            <li>insert friend here</li>
            <li>insert friend here</li>
          </ul>
        </div>
      </div>
    </div>
  );
}