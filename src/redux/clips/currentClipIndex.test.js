import { configureStore } from "@reduxjs/toolkit";
import currentClipIndex from "./currentClipIndex";

describe("currentClipIndex", () => {
  test("should have default value of 0", async () => {
    // Act
    const store = configureStore({
      reducer: {
        currentClipIndex
      },
      devTools: false
    });

    // Assert
    expect(store.getState().currentClipIndex).toStrictEqual(0);
  });
});
