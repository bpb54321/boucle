import { clipChanged } from "../../redux/clip/clipSlice";
import { clipUpdated } from "../../redux/clips/clipsSlice";

export function updateClip(clip, clipIndexToUpdate, dispatch) {
  dispatch(clipChanged(clip));
  dispatch(clipUpdated({ clip, clipIndexToUpdate }));
}
