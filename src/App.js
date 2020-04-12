import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import { ClipPlayer } from "components/ClipPlayer";
import React, { useEffect } from "react";
import "App.css";
import { useSelector, useDispatch } from "react-redux";
import { getClips, getCurrentClipIndex } from "redux/selectors";
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

  useEffect(() => {
    window.lastAction = "clips fetched";
    dispatch(fetchClips());
  }, [dispatch]);

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
        <ClipPlayer clip={clip} />
        <div>
          <button data-testid={"new-clip-button"} onClick={handleAddClip}>
            New Clip
          </button>
        </div>
        {clips.length > 0 ? <ClipEditForm clip={clip} /> : null}
      </main>
    </div>
  );
};

export default App;
