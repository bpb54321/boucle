import { createReducer } from "@reduxjs/toolkit";
import last from "lodash/last";

import { clipAdded } from "../actions";

const clips = createReducer([], {
  [clipAdded]: state => {
    if (state.length > 0) {
      const lastClip = last(state);
      const newClip = {
        startTime: lastClip.endTime,
        endTime: lastClip.endTime + 3,
        transcription: ""
      };
      state.push(newClip);
    } else {
      const defaultFirstClip = {
        startTime: 0,
        endTime: 5,
        transcription: ""
      };
      state.push(defaultFirstClip);
    }
  }
});

export default clips;
