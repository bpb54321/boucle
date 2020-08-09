import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { getClips, getCurrentClipIndex } from "./selectors";
import Chance from "chance";

const chance = new Chance();

function configureStoreWithPreloadedState(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    devTools: false,
    preloadedState
  });
}
describe("Selectors", () => {
  test("getClips", async () => {
    const clips = ["clip 1", "clip 2"];
    const store = configureStoreWithPreloadedState({ clips });

    const actualClips = getClips(store.getState());

    expect(actualClips).toStrictEqual(clips);
  });
  test("getCurrentClipIndex", async () => {
    const currentClipIndex = chance.integer({ min: 0, max: 100 });
    const store = configureStoreWithPreloadedState({ currentClipIndex });

    const actual = getCurrentClipIndex(store.getState());

    expect(actual).toStrictEqual(currentClipIndex);
  });
});
