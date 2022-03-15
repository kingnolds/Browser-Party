import React, { useState, useEffect } from 'react';
import Timer from "../components/Timer"
import Scoreboard from "../components/Scoreboard"
import Whack from "../components/games/WhackAMole"
import Memory from "../components/games/MemoryBoard"
import Trivia from "../components/games/Trivia"

function Game({room, leaveRoom, id, socket, isHost}) {
  const [players, setPlayers] = useState([])
  const [round, setRound] = useState(0)
  const [scoreboard, setScoreboard] = useState(false)
  const [endGame, setEndGame] = useState(false)

  const styles = {
    card: {
        background: '#9E8FB2',
    },
    button: {
        margin: '20px',
        fontSize: '25px',
        backgroundColor: '#668586',
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
      <div style={styles.card} className="Game">
        {scoreboard ? (
            <Scoreboard room={room} id={id} players={players} endGame={endGame} round={round}/>
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
                            <button style={styles.button} className="btn" onClick={()=>startGame()}>Start Game!</button>
                        ):null}
                    </div>
                ):null}
                {round == 1 ? (
                    <div>
                        <Trivia socket={socket} room={room} category="geography"/>
                    </div>
                ) :null}
                {round == 2 ? (
                    <div>
                        <Whack socket={socket} room={room}/>
                    </div>
                ) :null}
                {round == 3 ? (
                    <div>
                        <Memory socket={socket} room={room}/>
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
        <button style={styles.button} className="btn" onClick={leaveRoom}>Leave Room</button>
      </div>
    );
  };
  
  export default Game;