import React, { useState, useEffect } from 'react';


function Pregame({socket, room, players, username, isHost, checkbox, startGame}) {
    
    const [messages, setMessages] = useState([])

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

    //   const sendMessage = () => {
    //     var message = $inputMessage.val();
    //     // Prevent markup from being injected into the message
    //     message = cleanInput(message);
    //     // if there is a non-empty message and a socket connection
    //     if (message && connected) {
    //       $inputMessage.val('');
    //       addChatMessage({
    //         username: username,
    //         message: message
    //       });
    //       // tell server to execute 'new message' and send along one parameter
    //       socket.emit('new message', message);
    //     }
    //   }

    //   const addChatMessage = (data, options) => {

    //   }

    //   socket.on('new message', function (data) {
    //     addChatMessage(data);
    //   });


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

                            </ul>
                        </div>
                        <input class="inputMessage" placeholder="Type here..."/>
                        
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