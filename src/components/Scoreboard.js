import React, { useState } from 'react';
import { useParams } from "react-router-dom";

function Scoreboard() {
    const params = useParams();
    return (
        <div>
            {/* insert classnames for sections */}
            <h2>Score here</h2>
            <h2>Rank here</h2>
            <h2>Top game</h2>
        </div>
    )
}

export default Scoreboard;