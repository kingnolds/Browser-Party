import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import Game from "./Game"
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";


// CHANGE FOR LOCAL vs DEPLOYED

// DEPLOYED
// const socket = io("https://browser-party-socket-io.herokuapp.com/", {
//   withCredentials: true
// });

// LOCAL
const socket = io("http://localhost:4000", {
  withCredentials: true
});

const styles = {
  logo: {
    margin: '10vh auto 0px auto',
  },
  component: {
    width: '440px',
    margin: '0 auto',
    padding: '25px',
    fontSize: '25px',
  },
  h4: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: '600'
  },
  hostJoin: {
    margin: '0 113px'
  },
  innerMiddle: {
    margin: '0 60px',
  },
  hostButton: {
    marginRight: '10px'
  },
  form: {
    marginTop: '15px',
    fontSize: '25px',
    marginLeft: '45px'
  },
  input:
  {
    fontSize: '25px',
    marginBottom: '15px',
  },
  button: {
    fontSize: '25px',
    margin: '10px'
  },
  joinButton: {
    marginLeft: '70px',
    marginRight: '48px',
    marginTop: '10px',
  },
  createButton: {
    marginLeft: '50px',
    marginRight: '48px',
    marginTop: '10px',
  },
}

export default function Play({ username }) {
  const [room, setRoom] = useState('');
  const [inGame, seInGame] = useState(false);
  const [isHost, setIsHost] = useState(false);

  let navigate = useNavigate();

  const loginChange = () => {
    let path = `/login`;
    navigate(path);
  }

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join-room", room, username, (response) => {
        if (response.status === "ok") {
          console.log(`${socket.username} is joining room ${room}`)
          seInGame(true)
        } else {
          alert("That room doesn't exist, either create the room or double check your room code")
        }
      })
    }
  }

  const createRoom = () => {
    if (username !== "" && room !== "") {
      console.log("create")
      socket.emit("create-room", room, username, (repsonse) => {
        console.log(repsonse)
        if (repsonse.status === "ok") {
          console.log("if")
          seInGame(true)
        } else {
          console.log("else")
          alert("Room already exists, pick a unique room code")
        }
      })
    }
  }

  const leaveRoom = () => {
    seInGame(false);
    setRoom('');
    socket.emit("leave-room", room, username)
  }

  return (
    <div>
      {username ? (
        <div>
          <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
          <div>
            {inGame ? (
              <div className="game-card">
                {/* <h4 style={styles.h4}>Socket Id: {socket.id}</h4> */}
                <Game room={room} leaveRoom={leaveRoom} id={socket.id} socket={socket} isHost={isHost} />
              </div>
            ) : (
              <div style={styles.component} className="component">
                {/* <h4 style={styles.h4}>Socket Id: {socket.id}</h4> */}
                <div>
                  {isHost ? (
                    <div>
                      <div style={styles.hostJoin}>
                        <button style={styles.hostButton} className="button-pressed" onClick={(event) => { setIsHost(true) }}>Host</button>
                        <button className="button" onClick={(event) => { setIsHost(false) }}>Join</button>
                      </div>
                      <div style={styles.form}>
                        {/* <label>Username:</label>
                    <br></br>
                    <input style={styles.input} type="text" onChange={(event) => { setUsername(event.target.value) }}></input> */}
                        <label>Choose Room Code:</label>
                        <br></br>
                        <input style={styles.input} className="input" type="text" onChange={(event) => { setRoom(event.target.value) }}></input>
                        <br></br>
                        <button style={styles.createButton} className="button" onClick={createRoom}>Create Room</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={styles.hostJoin}>
                        <button style={styles.hostButton} className="button" onClick={(event) => { setIsHost(true) }}>Host</button>
                        <button className="button-pressed" onClick={(event) => { setIsHost(false) }}>Join</button>
                      </div>
                      <div style={styles.form}>
                        {/* <label>Username:</label>
                  <br></br>
                  <input style={styles.input} type="text" onChange={(event) => { setUsername(event.target.value) }}></input> */}
                        <label>Existing Room Code:</label>
                        <br></br>
                        <input style={styles.input} className="input" type="text" onChange={(event) => { setRoom(event.target.value) }}></input>
                        <br></br>
                        <button style={styles.joinButton} className="button" onClick={joinRoom}>Join Room</button>
                      </div>
                      {/* // <div>
                //   <label>Username:</label>
                //   <input type="text" onChange={(event) => {setUsername(event.target.value)}}></input>
                //   <label>Existing Room Code:</label>
                //   <input type="text" onChange={(event) => {setRoom(event.target.value)}}></input>

                //   <button onClick={joinRoom}>Join Room</button>
                // </div> */}
                    </div>
                  )}
                </div>
              </div>

            )}

          </div>
        </div>
      ) : (
        <div>
          <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
          <div style={styles.component} className="component">
            You must login first!
            <button style={{marginLeft: '40px'}} className="button" type="submit" onClick={loginChange}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};