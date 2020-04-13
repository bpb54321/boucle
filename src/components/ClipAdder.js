import { clipDefaultDuration } from "constants.js";
import React from "react";
import { addClip } from "redux/clips/clipsThunks";
import { useSelector, useDispatch } from "react-redux";
import { getClip, getClips } from "redux/selectors";

export const ClipAdder = () => {
  console.log(`ClipAdder rendered`);
  window.totalNumberOfRenders++;
  const dispatch = useDispatch();
  const clips = useSelector(getClips);
  const clip = useSelector(getClip);

  const handleAddClip = () => {
    if (clips.length > 0) {
      dispatch(
        addClip({
          startTime: clip.endTime,
          endTime: clip.endTime + clipDefaultDuration,
          transcription: ""
        })
      );
    } else {
      dispatch(
        addClip({
          startTime: 0,
          endTime: 5,
          transcription: ""
        })
      );
    }
  };

  return (
    <div>
      <button data-testid={"new-clip-button"} onClick={handleAddClip}>
        New Clip
      </button>
    </div>
  );
};
