import '../../css/memory-game.css';
import { useState } from 'react';
import Card from './MemoryCard';
import Timer from '../Timer'

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

    const [cards, setCards] = useState(cardsArray);

    const resetCards = () => {
        cardsArray.sort(() => Math.random() - 0.5)
    }

    const [previous, setPrevious] = useState(-1);
    const [inGame, setInGame] = useState(false);
    const [score, setScore] = useState(0);
    const [turn, setTurn] = useState(0);

    const checkCard = (current) => {
        if (cards[current].id == cards[previous].id) {
            cards[current].status = "correct";
            cards[previous].status = "correct";
            setCards([...cards]);
            setPrevious(-1);
            setScore(score + 4);
        } else {
            cards[current].status = "incorrect";
            cards[previous].status = "incorrect";
            setCards([...cards]);
            if (turn > 8) { setScore(score - 2) };
            setTimeout(() => {
                cards[current].status = "";
                cards[previous].status = "";
                setCards([...cards]);
                setPrevious(-1);
            }, 1000)
        }
        setTurn(turn + 1);
    }

    const handleClick = (id) => {
        if (previous === -1) {
            cards[id].status = "active";
            setCards([...cards]);
            setPrevious(id);
        } else {
            checkCard(id);
        }
    }

    const endGame = () => {
        console.log("endgame", score);
        socket.emit("send-score", score);
        resetCards();
        setScore(0);
        setInGame(false);
    }

    socket.on(`start-memory${room}`, () => {
        resetCards();
        setInGame(true);
    })

    return (
        <div>
            {inGame ? (
                <div>
                    <Timer time={30000} onEnd={endGame}/>
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
        </div>
    );
}

export default Board;