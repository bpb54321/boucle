import { clipIdsFetched } from "redux/clips/clipsSlice";
import clipService from "redux/clip/clipService";

export const fetchClipIds = () => async dispatch => {
  const clipIds = await clipService.getClipIds();
  dispatch(clipIdsFetched(clipIds));
};
