import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getClip } from "redux/selectors";

export const ClipEditForm = () => {
  const clip = useSelector(getClip);
  const [localClipState, setLocalClipState] = useState(clip);

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
          setLocalClipState({
            ...localClipState,
            startTime: parseInt(event.target.value)
          });
        }}
      />
      <label htmlFor="loop-end-time">Loop End Time</label>
      <input
        data-testid="loop-end-time"
        id="loop-end-time"
        type="number"
        value={localClipState.endTime}
        onChange={event => {
          setLocalClipState({
            ...localClipState,
            endTime: parseInt(event.target.value)
          });
        }}
      />
      <div>
        <textarea
          className={"App__textarea"}
          data-testid="transcription-input"
          type="textarea"
          onChange={event => {
            setLocalClipState({
              ...localClipState,
              transcription: event.target.value
            });
          }}
          value={localClipState.transcription}
        />
      </div>
    </form>
  );
};
