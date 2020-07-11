import { configureStore } from "@reduxjs/toolkit";
import { clipAdded } from "../actions";
import clips from "./clips";

describe("clips", () => {
  test("should return initial state when store initialized", async () => {
    const initialState = [];
    const store = configureStore({
      reducer: {
        clips
      }
    });
    expect(store.getState().clips).toStrictEqual(initialState);
  });
  test("should be able to add the first clip of a media source", async () => {
    const previousState = [];
    const firstClip = {
      startTime: 0,
      endTime: 5,
      transcription: ""
    };
    const nextState = [firstClip];

    expect(clips(previousState, clipAdded())).toStrictEqual(nextState);
  });
  test(
    "should add a new clip with correct default values based on the last clip added " +
      "when there is already a clip in state",
    async () => {
      const previousState = [
        {
          startTime: 0,
          endTime: 5,
          transcription: ""
        }
      ];
      const nextState = [
        ...previousState,
        {
          startTime: previousState[0].endTime,
          endTime: previousState[0].endTime + 3,
          transcription: ""
        }
      ];
      expect(clips(previousState, clipAdded())).toStrictEqual(nextState);
    }
  );
});
