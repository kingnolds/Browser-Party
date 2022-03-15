import '../../css/game.css';
import { useState } from 'react';
import Card from './MemoryCard';
import Timer from '../Timer'
import GameOver from '../GameOver'

function Board({ socket, room }) {
    const cardsArray = [
        { id: 1, img: '/images/manatee.png', status: "" },
        { id: 1, img: '/images/manatee.png', status: "" },
        { id: 2, img: '/images/whale.png', status: "" },
        { id: 2, img: '/images/whale.png', status: "" },
        { id: 3, img: '/images/jellyfish.png', status: "" },
        { id: 3, img: '/images/jellyfish.png', status: "" },
        { id: 4, img: '/images/starfish.png', status: "" },
        { id: 4, img: '/images/starfish.png', status: "" },
        { id: 5, img: '/images/shark.png', status: "" },
        { id: 5, img: '/images/shark.png', status: "" },
        { id: 6, img: '/images/coral.jpeg', status: "" },
        { id: 6, img: '/images/coral.jpeg', status: "" },
        { id: 7, img: '/images/octopus.png', status: "" },
        { id: 7, img: '/images/octopus.png', status: "" },
        { id: 8, img: '/images/shrimp.png', status: "" },
        { id: 8, img: '/images/shrimp.png', status: "" }
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
    const [modal, setModal] = useState(false)
    const [time, setTime] = useState(30000);

    const checkCard = (current) => {
        if(cards[current].id == cards[previous].id) {
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
        // if (cards[current].id == cards[previous].id) {
        //     cards[current].status = "correct";
        //     cards[previous].status = "correct";
        //     setCards([...cards]);
        //     setPrevious(-1);
        //     setScore(score + 4);
        // } else {
        //     cards[current].status = "incorrect";
        //     cards[previous].status = "incorrect";
        //     setCards([...cards]);
        //     if (turn > 8) { setScore(score - 2) };
        //     setTimeout(() => {
        //         cards[current].status = "";
        //         cards[previous].status = "";
        //         setCards([...cards]);
        //         setPrevious(-1);
        //     }, 1000)
        // }
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
        setModal(true)
        resetCards();
        setScore(0);
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
                    <h3>Get Ready!</h3>
                </div>
            )}
            <GameOver modal={modal} />
        </div>
    );
}

export default Board;