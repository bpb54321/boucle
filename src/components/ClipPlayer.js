import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getClip } from "redux/selectors";

export const ClipPlayer = () => {
  const clip = useSelector(getClip);
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

  const onTimeUpdate = () => {
    if (Math.floor(audioPlayerRef.current.currentTime) === clip.endTime) {
      audioPlayerRef.current.pause();
      setFinishedBreak(false);

      setTimeout(() => {
        setFinishedBreak(true);
      }, pauseTimeBetweenLoops * 1000);
    }
  };

  useEffect(() => {
    if (!isStopped && finishedBreak) {
      handleStartLoop();
    }
  }, [isStopped, finishedBreak, handleStartLoop]);

  useEffect(() => {
    const loopDuration = clip.endTime - clip.startTime;
    setPauseTimeBetweenLoops(loopDuration);
  }, [clip.startTime, clip.endTime]);

  return (
    <div>
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
        <button onClick={handleStartLoop} data-testid="start-loop-button">
          Start
        </button>
        <button onClick={handleStopLoop} data-testid="stop-loop-button">
          Stop
        </button>
      </div>
    </div>
  );
};
