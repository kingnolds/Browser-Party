import React, { useState } from 'react';


function Pregame({socket, room, players, username, isHost, checkbox, startGame}) {
    
    const [messages, setMessages] = useState([{
        username: "BrowserParty",
        content: "Use this space to say hi to your opponents! Or talk trash and throw them off their game...",
        id: 0
    }])
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

    socket.on('add-new-message', (data) => {
        if(data !== messages) {
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
                <h1>Lobby: {room}</h1>

                <h3>Players:</h3>
                <ul className="list-group">
                    {players.map(player => (
                        <li className="list-group-player" key={player.username} style={(player.username === username) ? {color:"blue"}:{}}>
                            {player.username} (score: {player.score})
                        </li>
                    ))}
                </ul>

                <h3>Chat</h3>
                <div className="chatArea">
                    <ul className="messages">
                        {messages.map(message => {
                            return (
                                <li key={message.id} style={(message.username === username) ? {color:"blue"}:{}}>{message.username}: {message.content}</li>
                            )
                        })}
                    </ul>
                </div>
                <form >
                    <input className="inputMessage" placeholder="Type here..." onChange={handleFormChange} value={newMessage}/>
                    <button type="submit" onClick={sendMessage}>Send</button>
                </form>
                
                {isHost ? (
                    <div>
                        <h3>Host options:</h3>
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