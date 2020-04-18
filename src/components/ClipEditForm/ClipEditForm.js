import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clipChanged } from "redux/clip/clipSlice";
import { getClip, getCurrentClipIndex } from "redux/selectors";
import {
  dispatchClipOrMarkInvalid,
} from "components/ClipEditForm/functions";

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
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <label htmlFor="loop-start-time">Loop Start Time</label>
      <input
        data-testid="loop-start-time"
        id="loop-start-time"
        type="number"
        value={localClipState.startTime}
        onChange={event => {
          const updatedClip = {
            ...localClipState,
            startTime: processNumberInput(event.target.value)
          };
          dispatchClipOrMarkInvalid(
            updatedClip,
            currentClipIndex,
            setStartTimeIsValid,
            setLocalClipState,
            dispatch
          );
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
        onChange={event => {
          const updatedClip = {
            ...localClipState,
            endTime: parseInt(event.target.value)
          };
          dispatch(clipChanged(updatedClip));
          // setLocalClipState({
          //   ...localClipState,
          //   endTime: parseInt(event.target.value)
          // });
        }}
      />
      <div>
        <textarea
          className={"App__textarea"}
          data-testid="transcription-input"
          type="textarea"
          onChange={event => {
            const updatedClip = {
              ...clip,
              transcription: event.target.value
            };
            dispatch(clipChanged(updatedClip));
            // setLocalClipState({
            //   ...localClipState,
            //   transcription: event.target.value
            // });
          }}
          value={localClipState.transcription}
        />
      </div>
    </form>
  );
};
