import React, { useState, useEffect } from 'react';
import Scoreboard from "../components/Scoreboard"
import Whack from "../components/games/WhackAMole"
import Memory from "../components/games/MemoryBoard"
import Trivia from "../components/games/Trivia1"

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

  socket.on(`set-round`, (round) => {
    console.log("set round", round)
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
    console.log(includeTrivia, includeWhack, includeMemory, includeSnake)
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
  }, [players]);                               // adjust dependencies to your needs

    return (
      <div className="Game">
        {scoreboard ? (
            <Scoreboard room={room} username={username} players={players} endGame={endGame} nextRound={round}/>
        ) : (
            <div>
                {round === 0 ? (
                    <div>
                        <h1>Game: {room}</h1>
                        <h3>Players:</h3>
                        <ul className="list-group">
                            {players.map(player => (
                                <li className="list-group-player" key={player.username} style={(player.username == username) ? {color:"blue"}:{}}>
                                    {player.username} (score: {player.score})
                                </li>
                            ))}
                        </ul>
                        
                        {isHost ? (
                            <div>
                                <form>
                                    <input type="checkbox" key="triviaCheck" name="triviaCheck" onChange={() => {checkbox("Trivia")}}/>
                                    <label htmlFor="triviaCheck"> Trivia</label><br/>
                                    <input type="checkbox" key="whackCheck" name="whackCheck" onChange={() => {checkbox("Whack")}}/>
                                    <label htmlFor="whackCheck"> Whack-A-Mole</label><br/>
                                    <input type="checkbox" key="memoryCheck" name="memoryCheck" onChange={() => {checkbox("Memory")}}/>
                                    <label htmlFor="memoryCheck"> Memory Cards</label><br/>
                                    <input type="checkbox" key="snakeCheck" name="snakeCheck" disabled readOnly/>
                                    <label htmlFor="snakeCheck"> Snake (in development)</label>
                                    <br/>
                                </form>
                                    <br/>
                                <button style={styles.button} className="btn" onClick={()=>startGame()}>Start Game!</button>
                            </div>
                            
                        ):null}
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
        <button style={styles.button} className="btn" onClick={leaveRoom}>Leave Room</button>
      </div>
    );
  };
  
  export default Game;