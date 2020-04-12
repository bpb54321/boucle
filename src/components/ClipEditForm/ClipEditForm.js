import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { clipChanged } from "redux/clip/clipSlice";
import { getClips, getCurrentClipIndex } from "redux/clip/clipSelectors";

export const ClipEditForm = function({ clip, ...props }) {
  const dispatch = useDispatch();
  const clips = useSelector(getClips);
  const currentClipIndex = useSelector(getCurrentClipIndex);
  const [localClipState, setLocalClipState] = useState(clips[0]);

  useEffect(() => {
    setLocalClipState(clips[currentClipIndex]);
  }, [currentClipIndex]);

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
          if (event.target.value) {
            // dispatch(
            //   clipChanged({
            //     ...clip,
            //     startTime: parseInt(event.target.value)
            //   })
            // );
          } else {
            setLocalClipState({
              ...localClipState,
              startTime: event.target.value
            });
          }
        }}
      />
      <label htmlFor="loop-end-time">Loop End Time</label>
      <input
        data-testid="loop-end-time"
        id="loop-end-time"
        type="number"
        value={localClipState.endTime}
        onChange={event => {
          if (event.target.value) {
            // dispatch(
            //   clipChanged({
            //     ...clip,
            //     endTime: parseInt(event.target.value)
            //   })
            // );
          } else {
            setLocalClipState({
              ...localClipState,
              endTime: event.target.value
            });
          }
        }}
      />
      <div>
        <textarea
          className={"App__textarea"}
          data-testid="transcription-input"
          type="textarea"
          onChange={event => {
            // dispatch(
            //   clipChanged({
            //     ...clip,
            //     transcription: event.target.value
            //   })
            // );
          }}
          value={localClipState.transcription}
        />
      </div>
    </form>
  );
};
