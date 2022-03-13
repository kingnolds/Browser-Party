import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateJoin({createRoom, joinRoom}) {
    const [isHost, setIsHost] = useState(false);
    const [room, setRoom] = useState('');
    const [username, setUsername] = useState('');

    const create = () => {
        console.log("hi")
        createRoom();
    }

    return (
    <div>
      <div className="CreateJoin">
      <button onClick={(event) => {setIsHost(true)}}>Host</button>
        <button onClick={(event) => {setIsHost(false)}}>Join</button>
        {isHost ? (
          <div>
            <br/>
            <label>Username:</label>
            <input type="text" onChange={(event) => {setUsername(event.target.value)}}></input>
            <br/>
            <label>Choose Room Code:</label>
            <input type="text" onChange={(event) => {setRoom(event.target.value)}}></input>
            <button onClick={create}>Create Room</button>
          </div>
        ) : (
          <div>
            <br/>
            <label>Username:</label>
            <input type="text" onChange={(event) => {setUsername(event.target.value)}}></input>
            <br/>
            <label>Existing Room Code:</label>
            <input type="text" onChange={(event) => {setRoom(event.target.value)}}></input>
            
            <button onClick={joinRoom}>Join Room</button>
          </div>

        )}
      </div>
    </div>
  );
}
