import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import { ClipPlayer } from "components/ClipPlayer";
import React, { useEffect } from "react";
import "App.css";
import { useSelector, useDispatch } from "react-redux";
import { getClip, getClips } from "redux/selectors";
import { clipDefaultDuration } from "constants.js";
import { addClip, fetchClips } from "redux/clips/clipsThunks";

const App = () => {
  const dispatch = useDispatch();
  const clips = useSelector(getClips);
  const clip = useSelector(getClip);

  useEffect(() => {
    window.lastAction = "clips fetched";
    dispatch(fetchClips());
  }, [dispatch]);

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
