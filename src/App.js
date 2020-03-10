import React, { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import { ClipView } from "./components/ClipView/ClipView";

function App() {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isStopped, setIsStopped] = useState(false);
  const [finishedBreak, setFinishedBreak] = useState(false);
  const [pauseTimeBetweenLoops, setPauseTimeBetweenLoops] = useState(0);

  const audioPlayerRef = useRef();
  const handleStartLoop = useCallback(() => {
    audioPlayerRef.current.currentTime = startTime;
    audioPlayerRef.current.play();
  }, [startTime]);

  function handleStopLoop() {
    audioPlayerRef.current.pause();
    setIsStopped(true);
  }

  const onValueChange = (event, setterFunction) => {
    setterFunction(parseInt(event.target.value));
  };

  useEffect(() => {
    if (!isStopped && finishedBreak) {
      handleStartLoop();
    }
  }, [isStopped, finishedBreak, handleStartLoop]);

  useEffect(() => {
    const loopDuration = endTime - startTime;
    setPauseTimeBetweenLoops(loopDuration);
  }, [startTime, endTime]);

  const onTimeUpdate = event => {
    if (Math.floor(audioPlayerRef.current.currentTime) === endTime) {
      audioPlayerRef.current.pause();
      setFinishedBreak(false);

      setTimeout(() => {
        setFinishedBreak(true);
      }, pauseTimeBetweenLoops * 1000);
    }
  };

  return (
    <div className="App">
      <main>
        <audio
          ref={audioPlayerRef}
          data-testid={"audio-player"}
          controls
          src="infoman-s20-e24.mp4"
          onTimeUpdate={onTimeUpdate}
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
        <form
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <label htmlFor="loop-start-time">Loop Start Time</label>
          <input
            id="loop-start-time"
            type="number"
            value={startTime}
            onChange={event => {
              onValueChange(event, setStartTime);
            }}
            data-testid="loop-start-time"
          />
          <label htmlFor="loop-end-time">Loop End Time</label>
          <input
            id="loop-end-time"
            type="number"
            value={endTime}
            onChange={event => {
              onValueChange(event, setEndTime);
            }}
            data-testid="loop-end-time"
          />
          <button onClick={handleStartLoop} data-testid="start-loop-button">
            Start
          </button>
          <button onClick={handleStopLoop} data-testid="stop-loop-button">
            Stop
          </button>
          <div>
            <ClipView />
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
