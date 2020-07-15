import { createReducer } from "@reduxjs/toolkit";
import last from "lodash/last";
import { clipAdded } from "../actions";
import createDefaultFirstClip from "./createDefaultFirstClip";
import createNewClipFromPreviousClip from "./createNewClipFromPreviousClip";

const clips = createReducer([], {
  [clipAdded]: state => {
    if (state.length > 0) {
      const previousClip = last(state);
      const newClip = createNewClipFromPreviousClip(previousClip);
      state.push(newClip);
    } else {
      state.push(createDefaultFirstClip());
    }
  }
});

export default clips;
