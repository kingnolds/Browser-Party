import React, { useState } from 'react';
import {useParams} from "react-router-dom"
import Lobby from "./Lobby"
import Game from "./Game"
import CreateJoin from '../components/CreateJoin';
import io from "socket.io-client";
const socket = io("http://localhost:4000");


function Play() {
    const [room, setRoom] = useState('');
    const [username, setUsername] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [pregame, setPregame] = useState(true);

    const info = {
      room: room,
      isHost: isHost,
    }

    const joinRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("join-room", room, username)
        setPregame(false)
      }
    }
    
    const createRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("create-room", room, username)
        console.log(pregame)
        setPregame(false)
        console.log(pregame)
      }
    }

    const leaveRoom = () => {
      socket.emit("leave-room", room, username)
      setPregame(true)
    }
   
  
    return (
      <div className="Play">
        <h1>Play</h1>
        {pregame ? (
          <div>
            <CreateJoin createRoom={createRoom} joinRoom={joinRoom}/>
          </div>
          ) : (
          <div>
            <Game/>
            <button onClick={leaveRoom}>Leave Room</button>
          </div>
            
        )}
        
      </div>
    );
  };
  
  export default Play;