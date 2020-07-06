import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClip, getCurrentClipIndex } from "redux/selectors";
import { updateClip } from "components/ClipEditForm/updateClip";
import {
  isEndTimeValid,
  isStartTimeValid,
} from "components/ClipEditForm/validation";

function processNumberInput(value) {
  if (isNaN(parseInt(value))) {
    return value;
  } else {
    return parseInt(value);
  }
}

export const ClipEditForm = () => {
  const dispatch = useDispatch();
  const clip = useSelector(getClip);
  const currentClipIndex = useSelector(getCurrentClipIndex);
  const [localClipState, setLocalClipState] = useState(clip);
  const [startTimeIsValid, setStartTimeIsValid] = useState(true);

  useEffect(() => {
    setLocalClipState(clip);
  }, [clip]);

  return (
    <form
      data-testid={"clip-edit-form"}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <label htmlFor="loop-start-time">Loop Start Time</label>
      <input
        data-testid="loop-start-time"
        id="loop-start-time"
        type="number"
        value={localClipState.startTime}
        onChange={(event) => {
          const updatedClip = {
            ...localClipState,
            startTime: processNumberInput(event.target.value),
          };
          setLocalClipState(updatedClip);
          if (isStartTimeValid(event.target.value)) {
            setStartTimeIsValid(true);
            dispatch(updateClip(updatedClip, currentClipIndex));
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
        value={localClipState.endTime}
        onChange={(event) => {
          const updatedClip = {
            ...localClipState,
            endTime: processNumberInput(event.target.value),
          };
          setLocalClipState(updatedClip);
          if (isEndTimeValid(event.target.value)) {
            dispatch(updateClip(updatedClip, currentClipIndex));
          }
        }}
      />
      <div>
        <textarea
          className={"App__textarea"}
          data-testid="transcription-input"
          type="textarea"
          onChange={(event) => {
            const updatedClip = {
              ...clip,
              transcription: event.target.value,
            };
            setLocalClipState(updatedClip);
            dispatch(updateClip(updatedClip, currentClipIndex));
          }}
          value={localClipState.transcription}
        />
      </div>
    </form>
  );
};
