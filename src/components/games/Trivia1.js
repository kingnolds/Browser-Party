import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Timer from "../Timer"
import RoundOver from "../RoundOver"



function Trivia({socket, room}) {
    const [endRound, setEndRound] = useState(false);
    const [question, setQuestion] = useState("");
    const [correct, setCorrect] = useState("");
    const [answers, setAnswers] = useState([]);
    const [time, setTime] = useState(20000)
    const [selection, setSelection] = useState("")
    const [score, setScore] = useState(0);
    
    let points = 0;

    socket.on(`start-trivia-${room}`, (triviaObj, time) => {
        setTime(time)
        startGame(triviaObj)
    })

    const startGame = (triviaObj) => {
        setQuestion(decodeURI(triviaObj.question));
        setCorrect(decodeURI(triviaObj.correct_answer));
        const ans = triviaObj.incorrect_answers;
        if (ans.length === 3){
            ans.push(triviaObj.correct_answer)
        }
        ans.map(an => {
            return decodeURI(an)
        })
        const shuffle = function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
        setAnswers(shuffle(ans))
    }

    const endGame = () => {
        if (selection === correct) {
            setScore(10)
            points = 10;
        }
        socket.emit("send-score", points)
        setEndRound(true)
    }

    const selectAnswer = (choice) => {
        setSelection(choice)
    }


    return (
        <div>
                {endRound ? (
                <div>
                    <RoundOver modal={endRound} points={score} isCorrect={(score === 10)}/>
                </div>
                ) : (
                <div>
                    <Timer time={time} onEnd={endGame}/>
                
                    <h3>Trivia!</h3>
                    <h4>Question: {question}</h4>
                    <ul className="list-group">
                        {answers.map(answer => (
                            <li className="list-group-player" key={answers.indexOf(answer)}>
                                <button onClick={() => selectAnswer(answer)}>{answer}</button>
                            </li>
                        ))}
                    </ul>
                    <p>Your selection: {selection}</p>
                </div>

                )}
                

        </div>
    )
}

export default Trivia;
