import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const [startTime, setStartTime] = useState(0);

  const audioPlayerRef = useRef();
  const handleStartLoop = () => {
    audioPlayerRef.current.fastSeek(startTime);
    audioPlayerRef.current.play();
  };

  const onValueChange = (event, setterFunction) => {
    setterFunction(parseInt(event.target.value));
  };

  const onTimeUpdate = event => {
    if (audioPlayerRef.current.currentTime >= 2) {
      audioPlayerRef.current.pause();
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
        <input id="loop-end-time" type="number" />
        <button onClick={handleStartLoop}>Start Loop</button>
      </main>
    </div>
  );
}

export default App;
