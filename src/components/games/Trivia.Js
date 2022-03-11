import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import API from "./utils/api"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Play from "./pages/Play";
import Login from "./pages/Login";



function Trivia ({mode, socket, room}) {
    const [startTrivia, setStartTrivia] = useState(false);
    const [correct, setCorrect] = useState("");
    const [incorrect, setIncorrect] = useState([]);

    socket.on(`trivia${room}`, (triviaObj) => {
        setCorrect(triviaObj.correct_answer);
        setIncorrect(triviaObj.incorrect_answers);
    })

    return (
        <h3>Trivia!</h3>
        
    )
}