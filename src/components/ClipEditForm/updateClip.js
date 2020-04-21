import { clipChanged } from "../../redux/clip/clipSlice";
import { clipUpdated } from "../../redux/clips/clipsSlice";

export const updateClip = (clip, clipIndexToUpdate) => async dispatch => {
  dispatch(clipChanged(clip));
  dispatch(clipUpdated({ clip, clipIndexToUpdate }));
};
