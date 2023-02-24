import '../../css/game.css';
import React, { useState } from 'react';
import Card from './MemoryCard';
import Timer from '../Timer'
import RoundOver from '../RoundOver'
import manatee from '../../images/manatee.png'
import whale from '../../images/whale.png'
import jellyfish from '../../images/jellyfish.png'
import starfish from '../../images/starfish.png'
import shark from '../../images/shark.png'
import coral from '../../images/coral.jpeg'
import octopus from '../../images/octopus.png'
import shrimp from '../../images/shrimp.png'

function Board({ socket, room }) {
    const cardsArray = [
        { id: 1, img: manatee, status: "" },
        { id: 1, img: manatee, status: "" },
        { id: 2, img: whale, status: "" },
        { id: 2, img: whale, status: "" },
        { id: 3, img: jellyfish, status: "" },
        { id: 3, img: jellyfish, status: "" },
        { id: 4, img: starfish, status: "" },
        { id: 4, img: starfish, status: "" },
        { id: 5, img: shark, status: "" },
        { id: 5, img: shark, status: "" },
        { id: 6, img: coral, status: "" },
        { id: 6, img: coral, status: "" },
        { id: 7, img: octopus, status: "" },
        { id: 7, img: octopus, status: "" },
        { id: 8, img: shrimp, status: "" },
        { id: 8, img: shrimp, status: "" }
    ];

    const resetCards = () => {
        cardsArray.sort(() => Math.random() - 0.5)
    }

    const [cards, setCards] = useState(cardsArray);
    const [cardsPressed, setCardsPressed] = useState(0);
    const [previous, setPrevious] = useState(-1);
    const [inGame, setInGame] = useState(false);
    const [score, setScore] = useState(0);
    const [turn, setTurn] = useState(0);
    // const [cardsPressed, setCardsPressed] = useState(0);
    const [time, setTime] = useState(30000);

    const checkCard = (current) => {
        if(cards[current].id === cards[previous].id) {
            cards[current].status = "correct";
            cards[previous].status = "correct";
            setCards([...cards]);
            setPrevious(-1);
            setScore(score + 4);
            setCardsPressed(0);
        } else {
            cards[current].status = "incorrect";
            cards[previous].status = "incorrect";
            setCards([...cards]);
            setTimeout(() => {
                cards[current].status = "";
                cards[previous].status = "";
                setCards([...cards]);
                if (turn > 8) { setScore(score - 2) };
                setPrevious(-1);
                setCardsPressed(0);
            }, 1000)
        }
        setTurn(turn + 1);
    }

    const handleClick = (id) => {
        if (cardsPressed < 2) {
            if (previous === -1) {
                if (cards[id].status !== "correct"){
                    setCardsPressed(cardsPressed + 1);
                    setPrevious(id);
                    cards[id].status = "active";
                    setCards([...cards]);
                }
            } else {
                if (id !== previous)
                {
                    if (cards[id].status !== "correct")
                    {
                        setCardsPressed(cardsPressed + 1);
                        checkCard(id);
                    }
                }
            }
        }
    }

    const endGame = () => {
        socket.emit("send-score", score);
        resetCards();
        // setScore(0);
        setInGame(false);
    }

    socket.on(`start-memory-${room}`, (time) => {
        resetCards();
        setTime(time)
        setInGame(true);
    })

    return (
        <div>
            {inGame ? (
                <div>
                    <Timer time={time} onEnd={endGame}/>
                    <h2>Score: {score}, Turn: {turn}</h2>
                    <div className="memory-board">
                        {cards.map((card, index) => (
                            <Card key={index} card={card} id={index} handleClick={handleClick} />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <RoundOver points={score} />
                </div>
            )}
            
        </div>
    );
}

export default Board;