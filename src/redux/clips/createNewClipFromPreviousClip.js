import { DEFAULT_CLIP_DURATION } from "./constants";

const createNewClipFromPreviousClip = previousClip => {
  return {
    startTime: previousClip.endTime,
    endTime: previousClip.endTime + DEFAULT_CLIP_DURATION,
    transcription: ""
  };
};

export default createNewClipFromPreviousClip;
