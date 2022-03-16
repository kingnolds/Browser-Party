import React, { useState } from 'react';


function Pregame({ socket, room, players, username, isHost, checkbox, startGame }) {

    const [messages, setMessages] = useState([{
        username: "BrowserParty",
        content: "Use this space to say hi to your opponents! Or talk trash and throw them off their game...",
        id: 0
    }])
    const [newMessage, setNewMessage] = useState("")

    const styles = {
        chatArea: {
            fontSize: '13px'
        },
    }

    socket.on('add-new-message', (data) => {
        if (data !== messages) {
            setMessages(data)
        }
    });

    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('send-new-message', newMessage, room, (messages.length));
        setNewMessage("")
    }

    const handleFormChange = (e) => {
        setNewMessage(e.target.value)
    }

    return (
        <div>
            <div>
                <h2 style={{textAlign: 'center'}}>Lobby: {room}</h2>
                <ul className="player-list">
                    {players.map(player => (
                        <li className="player-list-item" key={player.username} style={(player.username === username) ? { color: "white" } : {}}>
                            <img style={{maxHeight: '20px', margin: '0 5px 5px 0'}} src="/images/pawn-piece.png"/>
                             {player.username} (score: {player.score})
                        </li>
                    ))}
                </ul>
                {/* <h3 style={{textAlign: 'center'}}>Chat</h3> */}
                <div style={{borderRadius: '20px'}} className="computer-screen">
                    <div styles={styles.chatArea} className="chatArea">
                        <ul className="messages">
                            {messages.map(message => {
                                return (
                                    <li key={message.id} style={(message.username === username) ? { color: "white" } : {}}>{message.username}: {message.content}</li>
                                )
                            })}
                        </ul>
                        <form>
                            <input className="chat-computer-input" placeholder="Type here..." onChange={handleFormChange} value={newMessage} />
                            <button style={{marginLeft: '8px'}} className="chat-computer-button" type="submit" onClick={sendMessage}>Send</button>
                        </form>
                    </div>
                </div>
                {isHost ? (
                    <div className="host-options">
                        <h3>Host options:</h3>
                        <form className="host-options-list">
                            <input type="checkbox" key="triviaCheck" name="triviaCheck" onChange={() => { checkbox("Trivia") }} />
                            <label htmlFor="triviaCheck"> Trivia</label><br />
                            <input type="checkbox" key="whackCheck" name="whackCheck" onChange={() => { checkbox("Whack") }} />
                            <label htmlFor="whackCheck"> Whack-A-Mole</label><br />
                            <input type="checkbox" key="memoryCheck" name="memoryCheck" onChange={() => { checkbox("Memory") }} />
                            <label htmlFor="memoryCheck"> Memory Cards</label><br />
                            <input type="checkbox" key="snakeCheck" name="snakeCheck" disabled readOnly />
                            <label htmlFor="snakeCheck"> Snake (in development)</label>
                            <br />
                        </form>
                        <br />
                        <div style={{width: '170px', margin: '0 auto'}}>
                            <button className="button" onClick={() => startGame()}>Start Game!</button>
                        </div>
                    </div>

                ) : null}
            </div>
        </div>
    )
}

export default Pregame