import { ClipAdder } from "components/ClipAdder";
import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import { ClipPlayer } from "components/ClipPlayer";
import React, { useEffect } from "react";
import "App.css";
import { useSelector, useDispatch } from "react-redux";
import { getClips } from "redux/selectors";
import { fetchClips } from "redux/clips/clipsThunks";

const App = () => {
  const dispatch = useDispatch();
  const clips = useSelector(getClips);

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
        {clips.length > 0 ? <ClipEditForm /> : null}
      </main>
    </div>
  );
};

export default App;
