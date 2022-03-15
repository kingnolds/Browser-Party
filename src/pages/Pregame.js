import React, { useState, useEffect } from 'react';


function Pregame({socket, room, players, username, isHost, checkbox, startGame}) {
    
    const [messages, setMessages] = useState([{}])
    const [newMessage, setNewMessage] = useState("")

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

    socket.on('add-new-message', function (data) {
        setMessages(messages.push(data));
    });

    const sendMessage = () => {
        socket.emit('send-new-message', username, newMessage, room);
    }

    const handleFormChange = (e) => {
        setNewMessage(e.target.value)
    }

    return (
        <div>
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
                <div class="chatArea">
                    <ul class="messages">
                        {messages.map(message => {
                            return (
                                <li>{message.username}: {message.content}</li>
                            )
                        })}
                    </ul>
                </div>
                <form onSubmit={()=>{sendMessage()}}>
                    <input class="inputMessage" placeholder="Type here..." onChange={handleFormChange}/>
                    <input type="submit"/>
                </form>
                
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
        </div>
    )
}

export default Pregame