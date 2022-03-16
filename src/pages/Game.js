import React, { useState, useEffect } from 'react';
import Scoreboard from "../components/Scoreboard"
import Whack from "../components/games/WhackAMole"
import Memory from "../components/games/MemoryBoard"
import Trivia from "../components/games/Trivia"
import Pregame from "./Pregame"

function Game({room, leaveRoom, username, socket, isHost}) {
  const [players, setPlayers] = useState([])
  const [round, setRound] = useState(0)
  const [scoreboard, setScoreboard] = useState(false)
  const [endGame, setEndGame] = useState(false)
  const [includeTrivia, setIncludeTrivia] = useState(false)
  const [includeWhack, setIncludeWhack] = useState(false)
  const [includeMemory, setIncludeMemory] = useState(false)
  const [includeSnake, setIncludeSnake] = useState(false)
  
  const styles = {
    innerCard: {
        // marginLeft: '10px',
        marginBottom: '20px'
    },
    noButton: {
        background: 'none',
        border: 'none',
        float: 'right',
        color: 'white',
        fontSize: '22px',
        fontWeight: 'bold',
        textShadow: '2px 2px 1px #776e8d'
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

  socket.on(`set-round`, (round) => {
    if (round === "trivia1") {
        setRound(1)
    } 
    if (round === "whack") {
        setRound(2)
    } 
    if (round === "memory") {
        setRound(3)
    } 
    if (round === "snake") {
        setRound(4)
    } 
    if (round === "trivia2") {
        setRound(5)
    } 
  })

  socket.on(`end-game`, () => {
      setEndGame(true)
      setScoreboard(true)
  })

  const checkbox = (game) => {
    if (game === "Trivia") {
        setIncludeTrivia(!includeTrivia)
    }
    if (game === "Whack") {
        setIncludeWhack(!includeWhack)
    }
    if (game === "Memory") {
        setIncludeMemory(!includeMemory)
    }
    if (game === "Snake") {        
        setIncludeSnake(!includeSnake)   
    }
  }

  const startGame = () => {
    if (includeTrivia === false && includeWhack === false && includeMemory === false && includeSnake === false) {
        alert("You must choose at least game")
    } else {
        socket.emit("start-game", room, includeTrivia, includeWhack, includeMemory, includeSnake)
    }
  }

  useEffect(() => {
    let isMounted = true;               // note mutable flag
    socket.on(`player-left${room}`, (sockets) => {
      if (isMounted) setPlayers(sockets)
    })
    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, [players, room, socket]);                               // adjust dependencies to your needs

    return (
      <div className="Game">
        {scoreboard ? (
            <Scoreboard room={room} username={username} players={players} endGame={endGame} nextRound={round}/>
        ) : (
            <div style={styles.innerCard}>
                {round === 0 ? (
                    <div>
                        <Pregame socket={socket} username={username} room={room} isHost={isHost} players={players} checkbox={checkbox} startGame={startGame}/>
                    </div>
                ):null}
                {round === 1 ? (
                    <div>
                        <Trivia socket={socket} room={room}/>
                    </div>
                ) :null}
                {round === 2 ? (
                    <div>
                        <Whack socket={socket} room={room}/>
                    </div>
                ) :null}
                {round === 3 ? (
                    <div>
                        <Memory socket={socket} room={room}/>
                    </div>
                ) :null}
                {round === 4 ? (
                    <div>
                        <Whack socket={socket} room={room}/>
                    </div>
                ) :null}
                {round === 5 ? (
                    <div>
                        <Trivia socket={socket} room={room}/>
                    </div>
                ) :null}
            </div>
        )}
        <div style={{height: '15px', marginBottom: '5px'}}>
            <button style={styles.noButton} onClick={leaveRoom}>Leave Room</button>
        </div>
      </div>
    );
  };
  
  export default Game;