import React from "react";
import { useDispatch } from "react-redux";
import { clipAdded } from "../redux/actions";

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
