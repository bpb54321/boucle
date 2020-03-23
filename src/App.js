import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import React, { useRef, useState, useEffect, useCallback } from "react";
import "App.css";
import { useSelector, useDispatch } from "react-redux";
import { clipChanged } from "redux/clip/clipSlice";
import { clipDefaultDuration } from "constants.js";
import { clipIdAdded } from "redux/clips/clipsSlice";
import { fetchClipIdsAndFirstClip } from "redux/clips/clipsThunks";

const App = () => {
  const dispatch = useDispatch();
  const clip = useSelector(state => state.clip);
  const clipIds = useSelector(state => state.clips.clipIds);
  const { startTime, endTime } = clip;
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

  useEffect(() => {
    if (!isStopped && finishedBreak) {
      handleStartLoop();
    }
  }, [isStopped, finishedBreak, handleStartLoop]);

  useEffect(() => {
    const loopDuration = endTime - startTime;
    setPauseTimeBetweenLoops(loopDuration);
  }, [startTime, endTime]);

  useEffect(() => {
    window.lastAction = "clip ids fetched";
    dispatch(fetchClipIdsAndFirstClip());
  }, []);

  const onTimeUpdate = () => {
    if (Math.floor(audioPlayerRef.current.currentTime) === endTime) {
      audioPlayerRef.current.pause();
      setFinishedBreak(false);

      setTimeout(() => {
        setFinishedBreak(true);
      }, pauseTimeBetweenLoops * 1000);
    }
  };

  const handleAddClip = () => {
    if (clipIds.length > 0) {
      dispatch(
        clipChanged({
          startTime: clip.endTime,
          endTime: clip.endTime + clipDefaultDuration,
          transcription: ""
        })
      );
    } else {
      dispatch(
        clipChanged({
          startTime: 0,
          endTime: 5,
          transcription: ""
        })
      );
    }
    dispatch(clipIdAdded(10));
  };

  return (
    <div
      className="App"
      data-last-action={window.lastAction}
      data-testid={"app"}
    >
      <main>
        <audio
          ref={audioPlayerRef}
          data-testid={"audio-player"}
          controls
          src="../public/infoman-s20-e24.mp4"
          onTimeUpdate={onTimeUpdate}
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
        <div>
          <button data-testid={"new-clip-button"} onClick={handleAddClip}>
            New Clip
          </button>
        </div>
        <div>
          <button onClick={handleStartLoop} data-testid="start-loop-button">
            Start
          </button>
          <button onClick={handleStopLoop} data-testid="stop-loop-button">
            Stop
          </button>
        </div>
        {clipIds.length > 0 ? <ClipEditForm /> : null}
      </main>
    </div>
  );
};

export default App;
