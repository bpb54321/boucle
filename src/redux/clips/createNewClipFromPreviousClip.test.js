import { DEFAULT_CLIP_DURATION } from "./constants";
import createNewClipFromPreviousClip from "./createNewClipFromPreviousClip";

describe("createNewClipFromPreviousClip", () => {
  test("should create a new clip with correct values based on the previous clip", async () => {
    const previousClip = {
      startTime: 4,
      endTime: 10,
      transcriptiRon: "blah"
    };

    const expectedNewClip = {
      startTime: previousClip.endTime,
      endTime: previousClip.endTime + DEFAULT_CLIP_DURATION,
      transcription: ""
    };
    const actualNewClip = createNewClipFromPreviousClip(previousClip);

    expect(actualNewClip).toStrictEqual(expectedNewClip);
  });
});
