import { clipDefaultDuration } from "constants.js";
import React from "react";
import { clipAdded } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { getClip, getClips } from "redux/selectors";

export const ClipAdder = () => {
  const dispatch = useDispatch();

  const handleAddClip = () => {
    dispatch(clipAdded());
  };

  return (
    <div>
      <button data-testid={"new-clip-button"} onClick={handleAddClip}>
        New Clip
      </button>
    </div>
  );
};
