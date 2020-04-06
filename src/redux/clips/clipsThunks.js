import { clipIdsFetched } from "redux/clips/clipsSlice";
import { clipChanged } from "redux/clip/clipSlice";
import clipService from "redux/clip/clipService";

export const fetchClipIdsAndFirstClip = () => async dispatch => {
  const clipIds = await clipService.getClips();
  dispatch(clipIdsFetched(clipIds));

  if (clipIds.length > 0) {
    const clip = await clipService.getClipById(clipIds[0]);
    dispatch(clipChanged(clip));
  }
};
