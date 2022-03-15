import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Timer from "../Timer"
import GameOver from "../GameOver"



function Trivia({socket, room}) {
    const [modal, setModal] = useState(false);
    const [question, setQuestion] = useState("");
    const [correct, setCorrect] = useState("");
    const [answers, setAnswers] = useState([]);
    const [time, setTime] = useState(20000)
    const [selection, setSelection] = useState("")
    const [isCorrect, setIsCorrect] = useState(false);
    
    let score = 0;

    socket.on(`start-trivia-${room}`, (triviaObj, time) => {
        console.log("starting trivia!")
        setTime(time)
        startGame(triviaObj)
    })

    const startGame = (triviaObj) => {
        console.log(triviaObj)
        setQuestion(decodeURI(triviaObj.question));
        setCorrect(decodeURI(triviaObj.correct_answer));
        const ans = triviaObj.incorrect_answers;
        ans.push(triviaObj.correct_answer)
        ans.map(an => {
            return decodeURI(an)
        })
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
        console.log("end game")
        console.log(correct, selection)
        if (selection === correct) {
            setIsCorrect(true)
            score = 10;
        }
        socket.emit("send-score", score)
        setModal(true)
    }

    const selectAnswer = (choice) => {
        setSelection(choice)
        console.log(selection)
    }


    return (
        <div>
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
                <div>
                    <GameOver modal={modal}/>
                </div>

        </div>
    )
}

export default Trivia;
