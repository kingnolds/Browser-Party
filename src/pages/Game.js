import React, { useState, useEffect } from 'react';
import Timer from "../components/Timer"
import Whack from "../components/games/WhackAMole"
import API from '../utils/api';
import io from "socket.io-client";
import Scoreboard from "../components/Scoreboard"
import Memory from "../components/games/MemoryBoard"
// const socket = io("http://localhost:4000", {
//   withCredentials: true
// });

function Game({room, leaveRoom, id, socket, isHost}) {
  const [players, setPlayers] = useState([])
  const [scores, setScores] = useState([{}])
  const [round, setRound] = useState(0)
  const [scoreboard, setScoreboard] = useState(false)
  const [endGame, setEndGame] = useState(false)

  const styles = {
    button: {
        margin: '20px'
    }
  }

  socket.on(`scoreboard${room}`, (show) => {
    setScoreboard(show);
  })

  socket.on(`new-player${room}`, (sockets) => {
    setPlayers(sockets)
  })

  socket.on(`update-players${room}`, (sockets) => {
    setPlayers(sockets)
  })

  socket.on(`increment-round`, () => {
      setRound(round+1)
  })

  socket.on(`end-game`, () => {
      setEndGame(true)
      setScoreboard(true)
  })

  const startGame = () => {
      socket.emit("start-game", room)
  }

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
            <Scoreboard room={room} id={id} players={players} endGame={endGame}/>
        ) : (
            <div>
                {round == 0 ? (
                    <div>
                        <h1>Game: {room}</h1>
                        <h3>Players:</h3>
                        <ul className="list-group">
                            {players.map(player => (
                                <li className="list-group-player" key={player.id} style={(player.id == id) ? {color:"blue"}:{}}>
                                    {player.username} (id: {player.id}, score: {player.score})
                                </li>
                            ))}
                        </ul>
                        
                        {isHost ? (
                            <button style={styles.button} onClick={()=>startGame()}>Start Game!</button>
                        ):null}
                    </div>
                ):null}
                {round == 1 ? (
                    <div>
                        <Whack socket={socket} room={room}/>
                    </div>
                ) :null}
                {round == 2 ? (
                    <div>
                        <Memory socket={socket} room={room}/>
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
        <button style={styles.button} onClick={leaveRoom}>Leave Room</button>
      </div>
    );
  };
  
  export default Game;