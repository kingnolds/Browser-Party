import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Timer from "../Timer"



function Trivia({socket, room, category}) {
    const [showEndGame, setShowEndGame] = useState(false);
    const [question, setQuestion] = useState("");
    const [correct, setCorrect] = useState("");
    const [answers, setAnswers] = useState([]);
    const [time, setTime] = useState(20000)

    let score = 0;

    socket.on(`start-trivia-${room}`, (triviaObj, time) => {
        setTime(time)
        startGame(triviaObj)
        setShowEndGame(false)
    })

    const startGame = (triviaObj) => {
        console.log(triviaObj)
        setQuestion(triviaObj.question);
        setCorrect(triviaObj.correct_answer);
        const ans = triviaObj.incorrect_answers.push(triviaObj.correct_answer);
        console.log(ans)
        const shuffle = function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
        setAnswers(shuffle(ans))
        console.log(answers)
    }

    const endGame = () => {
        socket.emit("send-score", score)
        setShowEndGame(true)
    }

    const compare = (selection) => {
        if (selection === correct) {
          // on correct answer change button color to light green and increment score
          console.log(selection);
          selection.setAttribute("style", "background-color: lightgreen");
          score += 10;
        } else {
          // on wrong answer set button color to red and display correct answer below
          selection.setAttribute("style", "background-color: red");
        }
    }

    return (
        <div>

            {showEndGame ? (
                <div>
                    endgame
                </div>
            ): (
                <div>
                    <Timer time={time} onEnd={endGame}/>
                
                    <h3>Trivia!</h3>
                    <h4>Question: {question}</h4>
                    <ul className="list-group">
                        {answers.map(answer => (
                            <li className="list-group-player" key={answers.indexOf(answer)}>
                                <button onClick={() => compare({answer})}>{answer}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )
}

export default Trivia;
