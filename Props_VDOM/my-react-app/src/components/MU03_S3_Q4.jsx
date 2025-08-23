import React, { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }

    if (seconds === 10 && audioRef.current) {
      audioRef.current.play();
      setIsRunning(false); // optionally stop at 10 seconds
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h1>Stopwatch</h1>
      <div style={{ fontSize: 48, margin: 20 }}>{seconds}s</div>

      <button
        onClick={() => setIsRunning(true)}
        disabled={isRunning}
        style={{ marginRight: 10, padding: "10px 20px", fontSize: 16 }}
      >
        Start
      </button>
      <button
        onClick={() => setIsRunning(false)}
        disabled={!isRunning}
        style={{ padding: "10px 20px", fontSize: 16 }}
      >
        Stop
      </button>

      <audio
        ref={audioRef}
        src="https://www.soundjay.com/buttons/sounds/beep-07.mp3"
        preload="auto"
      />
    </div>
  );
}
