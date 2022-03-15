import React from 'react';
import API from "../utils/api"

export default function Scoreboard({room, username, players, endGame, nextRound}) {
    
    const games = [
        {
            game: "Trivia",
            instructions: "All or nothing. Players with the correct answer will earn 10 points while all other players earn zero. But don't worry, there will be multiple rounds of trivia!",
        },
        {
            game: "Whack-A-Mole",
            instructions: "Tap on the moles as they appear! +1 for whacking a mole, and -1 for missing.",
        },
        {
            game: "Memory Cards",
            instructions: "Try to memorize as many cards as you can before they disappear and then earn points by finding as many matches as possible before the time runs out.",
        },
        {
            game: "Snake",
            instructions: "Classic Snake! Use the arrow keys or the on-screen buttons to change directions and earn points by eating the target squares. Game ends when you crash into yourself or a wall."
        },
        {
            game: "Trivia",
            instructions: "All or nothing. Players with the correct answer will earn 10 points while all other players earn zero. But don't worry, there will be multiple rounds of trivia!",
        },
        
    ]

    function compare(a,b) {
        if (a.score < b.score)
           return 1;
        if (a.score > b.score)
          return -1;
        return 0;
      }
      
    const rankedScores = players.sort(compare); 
    const numOfPlayers = rankedScores.length;

    const playAgain = () => {
        window.location = '/play'
    }

    const init = async () => {
        if (endGame) {
            if (rankedScores[0].username === username && players.length > 1) {
                const response = await API.incrementWins(username)
            }
        } else {
            return;
        }
    }

    init()
    
    return (
        <div>
            {endGame ? (
                <div>
                    <h1>Game Over!</h1>
                    <h3>{rankedScores[0].username} is the winner!</h3>
                    <h5>Final Standings:</h5>
                    <ol className="list-group">
                    {rankedScores.map(player => (
                        <li className="list-group-player" key={player.username} style={(player.username === username) ? {color:"blue"}:{}}>
                            {player.username}: {player.score} points
                        </li>
                    ))}
                    </ol>
                    {numOfPlayers > 1 ? (
                        <h4>{rankedScores[numOfPlayers-1].username} seems about as sharp as a marble...</h4>

                    ) : null}

                    <button onClick={playAgain}>Play Again!</button>
                </div>
            ) : (
                <div>

                <h1>Scoreboard for room: {room}</h1>
                <ol className="list-group">
                    {rankedScores.map(player => (
                        <li className="list-group-player" key={player.username} style={(player.username === username) ? {color:"blue"}:{}}>
                            {player.username}: {player.score} points
                        </li>
                    ))}
                </ol>
                <h3>Next Round: {games[nextRound-1].game}</h3>
                <h5>Instructions: {games[nextRound-1].instructions}</h5>
                </div>


            )}
        </div>
    )
}
