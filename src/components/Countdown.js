import React, {useState, useEffect} from "react"

export default function Countown() {
    const [seconds, setSeconds] = useState(5)

    useEffect(() => {
        let timer;
        if (seconds > 0) {
          timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        }

        return () => {
          if (timer) {
            clearTimeout(timer);
          }
        };
    }, [seconds])
    

    return (
        <div style={{textAlign: "center"}}>
            <h1>Round begins in {seconds} {seconds === 1 ? "second" : "seconds"}...</h1>
        </div>
    )
}