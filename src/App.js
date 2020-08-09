import { ClipAdder } from "components/ClipAdder";
import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import { ClipPlayer } from "components/ClipPlayer";
import NavigationButton from "components/NavigationButton/NavigationButton";
import React from "react";
import "App.css";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentClipIndex } from "redux/selectors";
import { getClips } from "redux/selectors";
import { changeClip } from "clipNavigation";

const App = () => {
  const dispatch = useDispatch();
  const clips = useSelector(getClips);
  const currentClipIndex = useSelector(getCurrentClipIndex);

  return (
    <div className="App" data-testid={"app"}>
      <main>
        {clips.length > 0 && <ClipPlayer />}
        <ClipAdder />
        <div>
          <NavigationButton
            buttonAction={() => {
              changeClip("backward", currentClipIndex, clips, dispatch);
            }}
            text={"Previous"}
          />
          {clips.length > 0 ? <ClipEditForm /> : null}
          <NavigationButton
            buttonAction={() => {
              changeClip("forward", currentClipIndex, clips, dispatch);
            }}
            text={"Next"}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
