import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { clipChanged } from "redux/clip/clipSlice";

export const ClipEditForm = function({ id, ...props }) {
  const dispatch = useDispatch();
  const clip = useSelector(state => state.clip);
  const [localClipState, setLocalClipState] = useState(clip);

  useEffect(() => {
    if (id) {
      (async () => {
        const response = await axios.get(`clips/${id}`);
        setLocalClipState(response.data);
      })();
    }
  }, [id]);

  return (
    <form
      data-testid={"clip-edit-form"}
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <label htmlFor="loop-start-time">Loop Start Time</label>
      <input
        id="loop-start-time"
        type="number"
        value={localClipState.startTime}
        onChange={event => {
          if (event.target.value) {
            dispatch(clipChanged({ startTime: parseInt(event.target.value) }));
          }
          setLocalClipState({
            ...localClipState,
            startTime: event.target.value
          });
        }}
        data-testid="loop-start-time"
      />
      <label htmlFor="loop-end-time">Loop End Time</label>
      <input
        id="loop-end-time"
        type="number"
        value={localClipState.endTime}
        onChange={event => {
          if (event.target.value) {
            dispatch(clipChanged({ endTime: parseInt(event.target.value) }));
          }
          setLocalClipState({
            ...localClipState,
            endTime: event.target.value
          });
        }}
        data-testid="loop-end-time"
      />
      <div>
        <textarea
          className={"App__textarea"}
          data-testid="transcription-input"
          type="textarea"
          onChange={event => {
            dispatch(clipChanged({ transcription: event.target.value }));
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
