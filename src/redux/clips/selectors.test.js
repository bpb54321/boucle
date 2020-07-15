import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../rootReducer";
import { getClips } from "./selectors";

describe("Clips selectors", () => {
  test("getClips gets the clips", async () => {
    // Arrange
    const expectedClips = ["clip 1", "clip 2"];
    const store = configureStore({
      reducer: rootReducer,
      devTools: false,
      preloadedState: {
        clips: expectedClips
      }
    });

    // Act
    const actualClips = getClips(store.getState());

    // Assert
    expect(actualClips).toStrictEqual(expectedClips);
  });
});
