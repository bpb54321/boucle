import { clipChanged } from "../../redux/clip/clipSlice";
import { clipUpdated } from "../../redux/clips/clipsSlice";

function isClipValid(clip) {
  if (clip.startTime === "" || clip.endTime === "") {
    return false;
  } else {
    return true;
  }
}

export function dispatchClipOrMarkInvalid(
  clip,
  clipIndexToUpdate,
  setInputIsValid,
  setLocalClipState,
  dispatch
) {
  if (isClipValid(clip)) {
    setInputIsValid(true);
    dispatch(clipChanged(clip));
    dispatch(clipUpdated({ clip, clipIndexToUpdate }));
  } else {
    setLocalClipState(clip);
    setInputIsValid(false);
  }
}
