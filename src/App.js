import { ClipAdder } from "components/ClipAdder";
import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import { ClipPlayer } from "components/ClipPlayer";
import NavigationButton from "components/NavigationButton/NavigationButton";
import React, { useEffect } from "react";
import "App.css";
import { useSelector, useDispatch } from "react-redux";
import { getClips, getCurrentClipIndex } from "redux/selectors";
import { fetchClips } from "redux/clips/clipsThunks";
import { advanceToNextClip } from "clipNavigation";

const App = () => {
  const dispatch = useDispatch();
  const clips = useSelector(getClips);
  const currentClipIndex = useSelector(getCurrentClipIndex);

  useEffect(() => {
    window.lastAction = "clips fetched";
    dispatch(fetchClips());
  }, [dispatch]);

  return (
    <div
      className="App"
      data-last-action={window.lastAction}
      data-testid={"app"}
    >
      <main>
        <ClipPlayer />
        <ClipAdder />
        <div>
          {clips.length > 0 ? <ClipEditForm /> : null}
          <NavigationButton
            buttonAction={() => {
              advanceToNextClip(dispatch, currentClipIndex, clips);
            }}
            text={"Next"}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
