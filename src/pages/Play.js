import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"
import Lobby from "./Lobby"
import Game from "./Game"
import Scoreboard from "../components/Scoreboard"
import io from "socket.io-client";
const socket = io("http://localhost:4000", {
  withCredentials: true
});


function Play() {
    const [room, setRoom] = useState('');
    const [inGame, seInGame] = useState(false);
    const [username, setUsername] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [showScoreboard, setShowScoreboard] = useState(false);
    const [round, setRound] = useState(0);
    const [players, setPlayers] = useState([])

    const id = socket.id
    const joinRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("join-room", room, username)
        console.log(`${socket.username} is joining room ${room}`)
        seInGame(true)
      }
    }
      
    const createRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("create-room", room, username)
        console.log(socket.isHost)
        seInGame(true)
      }
    }

    const leaveRoom = () => {
      seInGame(false);
      setRoom('');
      socket.emit("leave-room", room, username)
    }
   
  
    return (
      <div className="Play">
        <h4>Play- socketId: {socket.id}</h4>
        {inGame ? (
          <Game room={room} leaveRoom={leaveRoom} id={socket.id} socket={socket} isHost={isHost}/>
        ) : (
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
                  <button onClick={createRoom}>Create Room</button>
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

        )}
        
      </div>
    );
  };
  
  export default Play;