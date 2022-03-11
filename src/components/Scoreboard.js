import React, { useState } from 'react';

export default function Scoreboard({room, id, players, endGame, round}) {
    
    console.log(players);

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
    
    return (
        <div>
            {endGame ? (
                <div>
                    <h1>Game Over!</h1>
                    <h3>{rankedScores[0].username} is the winner!</h3>
                    <h5>Final Standings:</h5>
                    <ol className="list-group">
                    {rankedScores.map(player => (
                        <li className="list-group-player" key={player.id} style={(player.id == id) ? {color:"blue"}:{}}>
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
                        <li className="list-group-player" key={player.id} style={(player.id == id) ? {color:"blue"}:{}}>
                            {player.username}: {player.score} points
                        </li>
                    ))}
                </ol>
                <h3>Next Round: </h3>
                <h5>Instructions: </h5>
                </div>


            )}
        </div>
    )
}


// function Scoreboard() {
//     const params = useParams();
//     return (
//         <div className="card" style={{ width: "500px", margin: "20px" }}>
//             <div className="card-body">
//                 <h2>Score: </h2>
//                 <h2>Rank: </h2>
//                 <h2>Top game: </h2>
//             </div>
//         </div>
//     )
// }

// export default Scoreboard;
