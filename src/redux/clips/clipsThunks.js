import { clipsFetched } from "redux/clips/clipsSlice";
import clipService from "redux/clip/clipService";

export const fetchClips = () => async dispatch => {
  const clipIds = await clipService.getClips();
  dispatch(clipsFetched(clipIds));
};
