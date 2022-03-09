import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import io from "socket.io-client";
const socket = io("http://localhost:4000", {
  withCredentials: true
});


function Lobby({room, leaveRoom, id}) {
  const [players, setPlayers] = useState([])
  let users;
  
  API.getUsers()
  .then(data => {
    users = data;
    console.log(data)
  })
  

  socket.id = id
  console.log(socket)
  console.log(room)

  socket.on(`new-player${room}`, (sockets) => {
    setPlayers(sockets)
  })

  socket.on(`player-left${room}`, (sockets) => {
    setPlayers(sockets)
  })

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
        <li className="list-group-item" key={item.id}>
          {item.username} (id: {item.id})
        </li>
      ))}
    </ul>
        <button onClick={leaveRoom}>Leave Room</button>
      </div>
    );
  };
  
  export default Lobby;