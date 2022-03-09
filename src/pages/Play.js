import React, { useState } from 'react';
import {useParams} from "react-router-dom"
import Lobby from "./Lobby"
import io from "socket.io-client";
const socket = io("http://localhost:4000");


function Play() {
    const [room, setRoom] = useState('');
    const [hasRoom, setHasRoom] = useState(false);
    const [username, setUsername] = useState('');
    let openRooms;
  
    // sending to the server
    socket.emit("getRoomNames", (response) => {
      openRooms = response.rooms;
    });

    const joinRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("join-room", room, username)
        setHasRoom(true)
      }
    }
      
    const createRoom = () => {
      if (username !== "") {
        socket.emit("create-room", room, username)
        setHasRoom(true)
      }
    }

    const leaveRoom = () => {
      setHasRoom(false);
      setRoom('');
      socket.emit("leave-room", room, username)
    }
   
  
    return (
      <div className="Play">
        <h1>Play</h1>
        {hasRoom ? (
          <div>
            <Lobby room={room} leaveRoom={leaveRoom} id={socket.id}/>
          </div>
        ) : (
          <div>
            <h2>{openRooms}</h2>
            <button onClick={createRoom}>
              Host
            </button>
            <br/>
            <br/>
            <br/>
            <label>Username:</label>
            <input type="text" onChange={(event) => {setUsername(event.target.value)}}></input>
            <br/>
            <label>Room code:</label>
            <input type="text" onChange={(event) => {setRoom(event.target.value)}}></input>
            <button onClick={joinRoom}>
              Join
            </button>
          </div>

        )}
        
      </div>
    );
  };
  
  export default Play;