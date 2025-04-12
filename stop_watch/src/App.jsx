import React, { useState, useRef, useEffect } from "react";

const Timer = () => {
  const [totalTime, setTotalTime] = useState(0); // in seconds
  const [currentTime, setCurrentTime] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(""); // string input from user
  const intervalRef = useRef(null);

  // Update totalTime when the input changes and Start is pressed
  const initTimer = () => {
    const parsedTime = parseFloat(inputMinutes);
    if (!isNaN(parsedTime) && parsedTime > 0) {
      const seconds = parsedTime * 60;
      setTotalTime(seconds);
      setCurrentTime(0);
    }
  };

  // Update UI via state, so React handles this

  const breakTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetTimer = () => {
    breakTimer();
    setInputMinutes("");
    setTotalTime(0);
    setCurrentTime(0);
  };

  const startTimer = () => {
    initTimer();
  };

  // Timer logic
  useEffect(() => {
    if (currentTime === 0 || currentTime >= totalTime) return;

    intervalRef.current = setInterval(() => {
      setCurrentTime((prevTime) => {
        if (prevTime + 1 >= totalTime) {
          clearInterval(intervalRef.current);
          return totalTime;
        }
        return prevTime + 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [totalTime]);

  const pauseTimer = () => {
    breakTimer();
  };

  return (
    <div className="timer">
      <input
        type="number"
        placeholder="Enter minutes"
        value={inputMinutes}
        onChange={(e) => setInputMinutes(e.target.value)}
      />
      <progress value={currentTime} max={totalTime}></progress>
      <p>Time Left: {Math.max(totalTime - currentTime, 0)} seconds</p>

      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
