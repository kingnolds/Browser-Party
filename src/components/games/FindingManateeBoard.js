import { useState } from 'react';
import Card from './FindingManateeCard';

function Board() {
    const [cards, setCards] = useState([
        { id: 1, img: '/images/manatee.png', status: ""},
        { id: 1, img: '/images/manatee.png', status: ""},
        { id: 2, img: '/images/whale.png', status: ""},
        { id: 2, img: '/images/whale.png', status: ""},
        { id: 3, img: '/images/jellyfish.png', status: ""},
        { id: 3, img: '/images/jellyfish.png', status: ""},
        { id: 4, img: '/images/starfish.png', status: ""},
        { id: 4, img: '/images/starfish.png', status: ""},
        { id: 5, img: '/images/shark.png', status: ""},
        { id: 5, img: '/images/shark.png', status: ""},
        { id: 6, img: '/images/coral.jpeg', status: ""},
        { id: 6, img: '/images/coral.jpeg', status: ""},
        { id: 7, img: '/images/octopus.png', status: ""},
        { id: 7, img: '/images/octopus.png', status: ""},
        { id: 8, img: '/images/shrimp.png', status: ""},
        { id: 8, img: '/images/shrimp.png', status: ""},
    ].sort(() => Math.random() - 0.5))

    const [previous, setPrevious] = useState(-1);

    const checkCard = (current) => {
        if(cards[current].id == cards[previous].id) {
            cards[current].status = "correct";
            cards[previous].status = "correct";
            setCards([...cards]);
            setPrevious(-1);
        } else {
            cards[current].status = "incorrect";
            cards[previous].status = "incorrect";
            setCards([...cards]);
            setTimeout(() => {
                cards[current].status = "";
                cards[previous].status = "";
                setCards([...cards]);
                setPrevious(-1);
            }, 1000)
        }
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

    return (
        <div className="board">
            { cards.map((card, index) => (
                <Card key={index} card={card} id={index} handleClick={handleClick}/>
            ))}
        </div>
    );
}

export default Board;