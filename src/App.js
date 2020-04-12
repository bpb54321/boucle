import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import React, { useRef, useState, useEffect, useCallback } from "react";
import "App.css";
import { useSelector, useDispatch } from "react-redux";
import { getClips, getCurrentClipIndex } from "redux/clip/clipSelectors";
import { clipChanged } from "redux/clip/clipSlice";
import { clipDefaultDuration } from "constants.js";
import { clipAdded } from "redux/clips/clipsSlice";
import { fetchClips } from "redux/clips/clipsThunks";

const App = () => {
  const dispatch = useDispatch();
  const clips = useSelector(getClips);
  const currentClipIndex = useSelector(getCurrentClipIndex);

  let clip;
  if (clips.length > 0) {
    clip = clips[currentClipIndex];
  } else {
    clip = {
      startTime: 0,
      endTime: 0,
      transcription: ""
    };
  }
  const [isStopped, setIsStopped] = useState(false);
  const [finishedBreak, setFinishedBreak] = useState(false);
  const [pauseTimeBetweenLoops, setPauseTimeBetweenLoops] = useState(0);

  const audioPlayerRef = useRef();
  const handleStartLoop = useCallback(() => {
    audioPlayerRef.current.currentTime = clip.startTime;
    audioPlayerRef.current.play();
  }, [clip.startTime]);

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
    const loopDuration = clip.endTime - clip.startTime;
    setPauseTimeBetweenLoops(loopDuration);
  }, [clip.startTime, clip.endTime]);

  useEffect(() => {
    window.lastAction = "clips fetched";
    dispatch(fetchClips());
  }, [dispatch]);

  const onTimeUpdate = () => {
    if (Math.floor(audioPlayerRef.current.currentTime) === clip.endTime) {
      audioPlayerRef.current.pause();
      setFinishedBreak(false);

      setTimeout(() => {
        setFinishedBreak(true);
      }, pauseTimeBetweenLoops * 1000);
    }
  };

  const handleAddClip = () => {
    if (clips.length > 0) {
      dispatch(
        clipAdded({
          startTime: clip.endTime,
          endTime: clip.endTime + clipDefaultDuration,
          transcription: ""
        })
      );
    } else {
      dispatch(
        clipAdded({
          startTime: 0,
          endTime: 5,
          transcription: ""
        })
      );
    }
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
        {clips.length > 0 ? <ClipEditForm clip={clip} /> : null}
      </main>
    </div>
  );
};

export default App;
