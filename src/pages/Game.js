import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import io from "socket.io-client";
import Scoreboard from "../components/Scoreboard"
// const socket = io("http://localhost:4000", {
//   withCredentials: true
// });



function Game({room, leaveRoom, id, socket, isHost}) {
  const [players, setPlayers] = useState([])
  const [round, setRound] = useState(0)
  const [scoreboard, setScoreboard] = useState(false)

  console.log(id)
  console.log(socket)
  console.log(room)

  const startGame = () => {
    socket.emit('increment-round', room)
  }

  socket.on(`new-player${room}`, (sockets) => {
    setPlayers(sockets)
  })

  socket.on(`player-left${room}`, (sockets) => {
    setPlayers(sockets)
  })

  socket.on(`increment-round`, () => {
      setRound(round+1)
  })

  useEffect(() => {
    let isMounted = true;               // note mutable flag
    socket.on(`player-left${room}`, (sockets) => {
      if (isMounted) setPlayers(sockets)
    })
    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, [players]);                               // adjust dependencies to your needs

  

    return (
      <div className="Game">
        {scoreboard ? (
            <Scoreboard/>
        ) : (
            <div>
                {round == 0 ? (
                    <div>
                        <h1>Game: {room}</h1>
                        <h3>Players:</h3>
                        <ul className="list-group">
                            {players.map(item => (
                                <li className="list-group-item" key={item.id} style={(item.id == id) ? {color:"blue"}:{}}>
                                    {item.username} (id: {item.id})
                                </li>
                            ))}
                        </ul>
                        
                        {isHost ? (
                            <button onClick={startGame}>Start Game!</button>
                        ):null}
                    </div>
                ):null}
                {round == 1 ? (
                    <div>
                        Game 1
                    </div>
                ) :null}
                {round == 2 ? (
                    <div>
                        {/* Some game */}
                    </div>
                ) :null}
                {round == 3 ? (
                    <div>
                        {/* Some game */}
                    </div>
                ) :null}
                {round == 4 ? (
                    <div>
                        {/* Some game */}
                    </div>
                ) :null}
                {round == 5 ? (
                    <div>
                        {/* Some game */}
                    </div>
                ) :null}

            </div>
        )}
        <button onClick={leaveRoom}>Leave Room</button>
      </div>
    );
  };
  
  export default Game;