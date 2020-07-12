import createDefaultFirstClip from "./createDefaultFirstClip";

describe("createDefaultFirstClip", () => {
  test("should create the default first clip", async () => {
    const expectedDefaultFirstClip = {
      startTime: 0,
      endTime: 5,
      transcription: ""
    };
    expect(createDefaultFirstClip()).toStrictEqual(expectedDefaultFirstClip);
  });
  test("returned clip should be a unique value every time function is called", async () => {
    expect(createDefaultFirstClip()).not.toBe(createDefaultFirstClip());
  });
});
