import React, { useEffect, useRef, useState } from 'react';
import RoundOver from '../RoundOver';

const MOLE_NUMBER = 9
let TIME_LIMIT = 30000
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

const Whack = function ({ socket, room }) {
    const [index, setIndex] = useState([]);
    const [score, setScore] = useState(0);
    const [refresh, setTimer] = useState();
    const [isPlaying, setIsPlaying] = useState(true)

    const generateIndex = () => {
        // let molesUp = Math.floor(Math.random() * 6)
        const arr = [...Array(MOLE_NUMBER)].map(x => Math.floor(Math.random() * MOLE_NUMBER));
        setIndex(arr)
    };
    const startGame = () => {
        generateIndex()
        const refresh = setInterval(generateIndex, 1500);
        setTimer(refresh);
    };
    const endGame = () => {
        setIsPlaying(false)
        clearInterval(refresh);
        socket.emit("send-score", score)
        // setScore(0);
        // setIndex(0);
    };
    const onClick = (n) => {
        if (index.includes(n)) {
            setScore((score) => score + 1)
            setIndex(index.filter(e => e !== n))
        } else { setScore((score) => score - 1) }
    };

    socket.on(`start-whack-${room}`, (time) => {
        TIME_LIMIT = (time)
        startGame()
    })

    return (
        <div>
            <style>
                {`
        .gameBox {
            display: flex;
            flex-wrap: wrap;
            height: 100%;
            align-items: center;
            max-width: 800px;
        }

        .hole {
          flex-grow: 1;
          width: 200px;
          height: 200px;
          border: 1px solid black;
          border-radius: 50%;
        }

        .moleHole {
          flex-grow: 1;
          width: 200px;
          height: 200px;
          border: 1px solid black;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-image: url(/images/mole.png);
          background-size: 90%;
          background-position: 50% 50%;
          animation: molemove 1s infinite;
        }
        
        @keyframes molemove {
            from {
                background-position: 50% 1000%;
            }
            to {
                background-position: 50% 50%;
            }
        }
        
        .container {
            flex-grow: 1;
            flex-basis: 30%;
            flex-shrink: 0;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 30%;
        }
        
        @media screen and (max-width: 992px) {
            .hole {
                width: 150px;
                height: 150px;
            }
            .moleHole {
                width: 150px;
                height: 150px;
            }
          }
        
        @media screen and (max-width: 600px) {
            .hole {
                width: 90px;
                height: 90px;
            }
            .moleHole {
                width: 90px;
                height: 90px;
            }
          }

      `}
            </style>
            {isPlaying ? (
                <>
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
                                            <button className="moleHole" onClick={() => onClick(n)}></button>
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
                </>
            ) : (
                <div>
                    <RoundOver points={score} />
                </div>
            )}

        </div>
    );
}

export default Whack;