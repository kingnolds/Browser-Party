import React, { Fragment, useEffect, useRef, useState } from 'react';
// import Timer from '../Timer'

const MOLE_NUMBER = 6
const TIME_LIMIT = 30000
const Timer = ({ time, interval = 1000, onEnd }) => {
    const [internalTime, setInternalTime] = useState(time)
    const timerRef = useRef(time)
    const timeRef = useRef(time)
    useEffect(() => {
        if (internalTime === 0 && onEnd) {
            onEnd()
        }
    }, [internalTime, onEnd])
    useEffect(() => {
        timerRef.current = setInterval(
            () => setInternalTime((timeRef.current -= interval)),
            interval
        )
        return () => {
            clearInterval(timerRef.current)
        }
    }, [interval])
    return <div>{`Time: ${internalTime / 1000}s`}</div>
}

const Whack = function ({socket, room}) {
    const [index, setIndex] = useState([]);
    const [score, setScore] = useState(0);
    const [refresh, setTimer] = useState();

    const generateIndex = () => {
        // let molesUp = Math.floor(Math.random() * 6)
        const arr = [...Array(MOLE_NUMBER)].map(x => Math.floor(Math.random() * MOLE_NUMBER));
        setIndex(arr)
    };
    const startGame = () => {
        generateIndex()
        const refresh = setInterval(generateIndex, 5000);
        setTimer(refresh);
    };
    const endGame = () => {
        clearInterval(refresh);
        socket.emit("send-score", score)
        setScore(0);
        setIndex(0);
    };
    const onClick = (n) => {
        if (index.includes(n)) {
            setScore((score) => score + 1)
            setIndex(index.filter(e => e !== n))
        } else { setScore((score) => score - 1) }
    };

    socket.on(`start-whack${room}`, () => {
        startGame()
    })

    return (
        <div>
            <style>
                {`
        .gameBox {
            display: flex;
            flex-wrap: wrap;
            height: 100%
        }

        .hole {
          flex-grow: 1;
          min-height: 90%;
          min-width: 90%;
          border: 1px solid black;
          border-radius: 50%;
        }
        
        .container {
          flex-grow: 1;
          flex-basis: 21%;
          flex-shrink: 0;
          min-height: 50px;
        }
        
        img {
         
        }
      `}
            </style>
            <p>score: {score}</p>
            <Timer
                time={TIME_LIMIT}
                onEnd={endGame}
            />
            <div className="gameBox">
                {Array(MOLE_NUMBER)
                    .fill()
                    .map((_, n) => {
                        if (Array.from(index).includes(n)) {
                            return (
                                <div className="container" key={n}>
                                    <img
                                        src="https://grid.gograph.com/happy-mole-cartoon-vector-art_gg68718247.jpg"
                                        alt="mole"
                                        onClick={() => onClick(n)}
                                    />
                                </div>
                            );
                        } else {
                            return (
                                <div className="container" key={n}>
                                    <button className="hole" onClick={() => onClick(-1)}></button>
                                </div>
                            );
                        }
                    })}
            </div>
        </div>
    );
}

export default Whack;