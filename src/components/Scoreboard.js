import React, { Fragment, useEffect, useRef, useState } from 'react';

export default function Scoreboard({room, id, players}) {
    
    function compare(a,b) {
        if (a.score < b.score)
           return -1;
        if (a.score > b.score)
          return 1;
        return 0;
      }
      
    const rankedScores = players.sort(compare); 
    
    return (
        <div>
            <h1>Scoreboard for room: {room}</h1>
            <ul className="list-group">
                {rankedScores.map(player => (
                    <li className="list-group-player" key={player.id} style={(player.id == id) ? {color:"blue"}:{}}>
                        {player.username}: {player.score} points
                    </li>
                ))}
            </ul>
        </div>
    )
}