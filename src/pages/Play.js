import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import Game from "./Game"
import Scoreboard from "../components/Scoreboard"
import io from "socket.io-client";

const socket = io("http://localhost:4000", {
  withCredentials: true
});

const styles = {
  card: {
    borderStyle: 'none',
    borderRadius: '10px',
    background: '#EEEEEE',
    width: '400px',
    margin: '18vh auto',
    padding: '25px',
    fontSize: '20px'
  },
  h4: {
    fontSize: '24px',
    fontWeight: '600',
    // marginTop: '20px'
  },
  hostJoin: {
    margin: '0 100px'
  },
  innerMiddle: {
    margin: '0 60px',
  },
  input: {
    marginBottom: '10px'
  },
  button: {
    margin: '10px'
  },
  roomButton: {
    marginLeft: '50px',
    marginRight: '48px',
    marginTop: '10px'
  },
  gameCard: {
    borderStyle: 'none',
    borderRadius: '10px',
    background: '#EEEEEE',
    width: '1000px',
    margin: '18vh auto',
    padding: '25px',
    fontSize: '20px'
  }
}

function Play(props) {
  const [room, setRoom] = useState('');
  const [inGame, seInGame] = useState(false);
  const [username, setUsername] = useState(props.username);
  const [isHost, setIsHost] = useState(false);

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
      {inGame ? (
        <div style={styles.gameCard}>
          <h4 style={styles.h4}>Play - socketId: {socket.id}</h4>
          <Game room={room} leaveRoom={leaveRoom} id={socket.id} socket={socket} isHost={isHost} />
        </div>
      ) : (
        <div style={styles.card}>
          <h4 style={styles.h4}>Play - socketId: {socket.id}</h4>
          <div className="CreateJoin">
            <div style={styles.hostJoin}>
              <button style={styles.button} onClick={(event) => { setIsHost(true) }}>Host</button>
              <button style={styles.button} onClick={(event) => { setIsHost(false) }}>Join</button>
            </div>
            {isHost ? (
              <div style={styles.innerMiddle}>
                <br></br>
                <label>Choose Room Code:</label>
                <br></br>
                <input style={styles.input} type="text" onChange={(event) => { setRoom(event.target.value) }}></input>
                <br></br>
                <button style={styles.roomButton} onClick={createRoom}>Create Room</button>
              </div>
            ) : (
              <div style={styles.innerMiddle}>
                <br></br>
                <label>Existing Room Code:</label>
                <br></br>
                <input style={styles.input} type="text" onChange={(event) => { setRoom(event.target.value) }}></input>
                <br></br>
                <button style={styles.roomButton} onClick={joinRoom}>Join Room</button>
              </div>
            )}
          </div>
        </div>

      )}

    </div>
  );
};

export default Play;