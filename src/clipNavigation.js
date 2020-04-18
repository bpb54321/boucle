import { clipChanged } from "redux/clip/clipSlice";
import { clipIndexChanged } from "redux/clips/clipsSlice";

export function changeClip(
  direction = "forward",
  currentClipIndex,
  clips,
  dispatch
) {
  let newClipIndex;
  if (direction === "forward") {
    newClipIndex = currentClipIndex + 1;
  } else {
    newClipIndex = currentClipIndex - 1;
  }
  dispatch(clipIndexChanged(newClipIndex));
  dispatch(clipChanged(clips[newClipIndex]));
}
