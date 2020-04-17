import { clipChanged } from "redux/clip/clipSlice";
import { clipIndexChanged } from "redux/clips/clipsSlice";

export function advanceToNextClip(dispatch, currentClipIndex, clips) {
  const nextClipIndex = currentClipIndex + 1;
  dispatch(clipIndexChanged(nextClipIndex));
  dispatch(clipChanged(clips[nextClipIndex]));
}
