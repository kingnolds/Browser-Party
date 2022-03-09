import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";

export default function Profile() {

  const params = useParams();
  return (
    <div>
      {/* check if logged in, then render this: */}
      <h1>Profile</h1>
      <h2>Username</h2>
      <Scoreboard/>
      <div className="game-history">
        <h2>Previous game history: </h2>
        {/* if we make a game history array: map each item to li below */}
        <ul>
          <li>insert game history here</li>
        </ul>
      </div>
      <div className="friends-list">
        <h2>Friends:</h2>
        {/* map each friend as a li here*/}
        <ul>
          <li>insert friends here</li>
        </ul>
      </div>
    </div>
  );
}