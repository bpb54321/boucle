export function isClipValid(clip) {
  return isStartTimeValid(clip.startTime) && isEndTimeValid(clip.endTime);
}

export function isStartTimeValid(startTime) {
  return startTime !== "";
}

export function isEndTimeValid(endTime) {
  return endTime !== "";
}

