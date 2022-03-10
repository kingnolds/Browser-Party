import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"
import API from '../utils/api';
import io from "socket.io-client";
const socket = io("http://localhost:4000", {
  withCredentials: true
});

// const styles = {
//   li: {

//   }
// }


function Lobby() {
  const params = useParams();
  const [players, setPlayers] = useState([])

  const room = params.roomId
  const isHost = params.isHost
  const id = params.socketId

  socket.on(`new-player${room}`, (sockets) => {
    console.log("newplayer")
    setPlayers(sockets)
  })

  socket.on(`player-left${room}`, (sockets) => {
    setPlayers(sockets)
  })

  const leaveRoom = () => {
    console.log("leaveroom-lobby")
  }

  const startGame = () => {
    console.log("startgame")
  }

  useEffect(() => {
    let isMounted = true;               // note mutable flag
    socket.on(`player-left${room}`, (sockets) => {
      if (isMounted) setPlayers(sockets)
    })
    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, [players]);                               // adjust dependencies to your needs

  

    return (
      <div className="Lobby">
        <h1>Lobby: {room}</h1>
        <h3>Players:</h3>
        <ul className="list-group">
          {/* Here we map over each grocery item and return a new array of `li` elements that contains the grocery name */}
          {/* When using map you must provide a unique key attribute to each item. Ours is `item.id` */}
          {players.map(item => (
        <li className="list-group-item" key={item.id} style={(item.id == id) ? {color:"blue"}:{}}>
          {item.username} (id: {item.id})
        </li>
      ))}
      </ul>
        <button onClick={leaveRoom}>Leave Room</button>
        {isHost ? (
          <div>
            <button onClick={startGame}>Start Game!</button>
          </div>
        ) : (
          <div>

          </div>
        )}
      </div>
    );
  };
  
  export default Lobby;