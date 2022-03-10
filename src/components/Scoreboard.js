import React, { useState } from 'react';
import { useParams } from "react-router-dom";

function Scoreboard() {
    const params = useParams();
    return (
        <div className="card" style={{ width: "500px", margin: "20px" }}>
            <div className="card-body">
                <h2>Score: </h2>
                <h2>Rank: </h2>
                <h2>Top game: </h2>
            </div>
        </div>
    )
}

export default Scoreboard;