import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { clipChanged } from "redux/clip/clipSlice";

export const ClipEditForm = function({ id, ...props }) {
  const dispatch = useDispatch();
  const clip = useSelector(state => state.clip);
  const { startTime, endTime, transcription } = clip;

  useEffect(() => {
    if (id) {
      (async () => {
        const response = await axios.get(`clips/${id}`);
        dispatch(clipChanged(response.data));
      })();
    }
  }, [id, dispatch]);

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
        value={startTime}
        onChange={event => {
          dispatch(clipChanged({ startTime: event.target.value }));
        }}
        data-testid="loop-start-time"
      />
      <label htmlFor="loop-end-time">Loop End Time</label>
      <input
        id="loop-end-time"
        type="number"
        value={endTime}
        onChange={event => {
          dispatch(clipChanged({ endTime: event.target.value }));
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
          }}
          value={transcription}
        />
      </div>
    </form>
  );
};
