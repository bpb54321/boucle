import { configureStore } from "@reduxjs/toolkit";
import {
  currentClipIndexDecremented,
  currentClipIndexIncremented
} from "../actions";
import currentClipIndex from "./currentClipIndex";
import Chance from "chance";

const chance = new Chance();

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
  test("should increment currentClipIndex when currentClipIndexIncremented is dispatched", async () => {
    // Arrange
    const previousCurrentClipIndex = chance.integer({ min: 0, max: 100 });

    // Act
    const nextState = currentClipIndex(
      previousCurrentClipIndex,
      currentClipIndexIncremented()
    );

    // Assert
    expect(nextState).toBe(previousCurrentClipIndex + 1);
  });
  test("should decrement currentClipIndex when currentClipIndexDecremented is dispatched", async () => {
    // Arrange
    const previousCurrentClipIndex = chance.integer({ min: 0, max: 100 });

    // Act
    const nextState = currentClipIndex(
      previousCurrentClipIndex,
      currentClipIndexDecremented()
    );

    // Assert
    expect(nextState).toBe(previousCurrentClipIndex - 1);
  });
});
