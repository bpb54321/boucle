import React, { useRef, useState } from "react";
import "./App.css";

function App({ pauseTimeBetweenLoops, ...props }) {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isStopped, setIsStopped] = useState(false);

  const audioPlayerRef = useRef();
  const handleStartLoop = () => {
    audioPlayerRef.current.currentTime = startTime;
    audioPlayerRef.current.play();
  };

  const handleStopLoop = () => {
    audioPlayerRef.current.pause();
    setIsStopped(true);
  };

  const onValueChange = (event, setterFunction) => {
    setterFunction(parseInt(event.target.value));
  };

  const onTimeUpdate = event => {
    console.log(`in timeupdate`);
    if (Math.floor(audioPlayerRef.current.currentTime) === endTime) {
      console.log(`pausing audio at endTime`);
      audioPlayerRef.current.pause();

      setTimeout(() => {
        console.log(`executing callback after pause`);
        if (!isStopped) {
          console.log(`restarting the playback from beginning`);
          audioPlayerRef.current.currentTime = startTime;
          audioPlayerRef.current.play();
        }
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
          src="la-saison-des-caucus-et-des-primaires-aux-eta.mp4"
          onTimeUpdate={onTimeUpdate}
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
        <label htmlFor="loop-start-time">Loop Start Time</label>
        <input
          id="loop-start-time"
          type="number"
          value={startTime}
          onChange={event => {
            onValueChange(event, setStartTime);
          }}
        />
        <label htmlFor="loop-end-time">Loop End Time</label>
        <input
          id="loop-end-time"
          type="number"
          value={endTime}
          onChange={event => {
            onValueChange(event, setEndTime);
          }}
        />
        <button onClick={handleStartLoop}>Start Loop</button>
        <button onClick={handleStopLoop}>Stop Loop</button>
      </main>
    </div>
  );
}

export default App;
