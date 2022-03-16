import React, { useState } from 'react';
import Timer from "../Timer"
import RoundOver from "../RoundOver"
import {decode} from "html-entities"



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
        setQuestion(decode(triviaObj.question));
        setCorrect(decode(triviaObj.correct_answer));
        const ans = triviaObj.incorrect_answers;
        if (ans.length === 3){
            ans.push(triviaObj.correct_answer)
        }
        ans.map(an => {
            return decode(an)
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
                    <ul style={{listStyle: 'none', margin: '10px'}} className="list-group">
                        {answers.map(answer => (
                            <li style={{margin: '10px 0'}} className="list-group-player" key={answers.indexOf(answer)}>
                                <button className="button" onClick={() => selectAnswer(answer)}>{answer}</button>
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
