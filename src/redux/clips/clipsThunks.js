import { clipsFetched } from "redux/clips/clipsSlice";
import { clipChanged } from "redux/clip/clipSlice";
import clipService from "redux/clip/clipService";

export const fetchClips = () => async dispatch => {
  const clips = await clipService.getClips();
  dispatch(clipsFetched(clips));

  if (clips.length > 0) {
    dispatch(clipChanged(clips[0]));
  }
};
