import { isStartTimeValid } from "components/ClipEditForm/validation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getClips, getCurrentClipIndex } from "../../redux/selectors";

// function processNumberInput(value) {
//   if (isNaN(parseInt(value))) {
//     return value;
//   } else {
//     return parseInt(value);
//   }
// }

export const ClipEditForm = () => {
  const clips = useSelector(getClips);
  const currentClipIndex = useSelector(getCurrentClipIndex);
  const { startTime, endTime, transcription } = clips[currentClipIndex];
  const [localClipState, setLocalClipState] = useState({
    startTime: startTime.toString(),
    endTime: endTime.toString(),
    transcription
  });
  const [startTimeIsValid, setStartTimeIsValid] = useState(true);

  return (
    <form
      data-testid={"clip-edit-form"}
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <label htmlFor="loop-start-time">Loop Start Time</label>
      <input
        data-testid="loop-start-time"
        id="loop-start-time"
        type="number"
        value={localClipState.startTime.toString()}
        onChange={event => {
          const updatedClip = {
            ...localClipState,
            startTime: event.target.value
          };
          setLocalClipState(updatedClip);
          if (isStartTimeValid(event.target.value)) {
            setStartTimeIsValid(true);
          } else {
            setStartTimeIsValid(false);
          }
        }}
      />
      {startTimeIsValid ? null : (
        <p data-testid={"start-time-invalid-input"}>
          Start time cannot be empty
        </p>
      )}
      <label htmlFor="loop-end-time">Loop End Time</label>
      <input
        data-testid="loop-end-time"
        id="loop-end-time"
        type="number"
        value={localClipState.endTime.toString()}
        onChange={event => {
          const updatedClip = {
            ...localClipState,
            endTime: event.target.value
          };
          setLocalClipState(updatedClip);
        }}
      />
      <div>
        <textarea
          className={"App__textarea"}
          data-testid="transcription-input"
          onChange={event => {
            const updatedClip = {
              ...localClipState,
              transcription: event.target.value
            };
            setLocalClipState(updatedClip);
          }}
          value={localClipState.transcription}
        />
      </div>
    </form>
  );
};
