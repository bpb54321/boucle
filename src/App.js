import React, {useRef, useState} from "react";
import "./App.css";

function App() {
  const [startTime, setStartTime] = useState('0');
  
  const audioPlayerRef = useRef(); 
  const handleStartLoop = () => {
    audioPlayerRef.current.fastSeek(startTime);
    audioPlayerRef.current.play();
    audioPlayerRef.current.pause();
  };
  
  const onValueChange = (event, setterFunction) => {
    setterFunction(event.target.value);
  };
  
  const onProgress = (event) => {
    console.log(event);
  };
  
  const onTimeUpdate = (event) => {
    console.log(audioPlayerRef.current.currentTime);
  };
  
  return (
    <div className="App">
      <main>
        <audio 
          ref={audioPlayerRef} 
          data-testid={'audio-player'} 
          controls 
          src="la-saison-des-caucus-et-des-primaires-aux-eta.mp4"
          onProgress={onProgress}
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
          onChange={(event) => {
            onValueChange(event,setStartTime);
          }}
        />
        <label htmlFor="loop-end-time">Loop End Time</label>
        <input id="loop-end-time" type="number"/>
        <button onClick={handleStartLoop}>Start Loop</button>
      </main>
    </div>
  );
}

export default App;
