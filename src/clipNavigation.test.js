import { changeClip } from "clipNavigation";
import { clipChanged } from "redux/clip/clipSlice";
import { clipIndexChanged } from "redux/clips/clipsSlice";
import { fakeClipsBuilder } from "redux/clip/fakeBuilders";

jest.mock("redux/clip/clipSlice");
jest.mock("redux/clips/clipsSlice");

describe("changeClip", () => {
  const clipIndexChangedAction = Symbol("clip index changed action");
  const clipChangedAction = Symbol("clip changed action");
  let currentClipIndex;
  let numberOfExistingClips;
  let clips;
  const dispatch = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    clipIndexChanged
      .mockName("clipIndexChanged")
      .mockReturnValue(clipIndexChangedAction);
    clipChanged.mockName("clipChanged").mockReturnValue(clipChangedAction);

    currentClipIndex = 0;
    numberOfExistingClips = 2;
    clips = fakeClipsBuilder(numberOfExistingClips);
  });
  describe("direction: forward", function() {
    test("should change currentClipIndex to one more than its current value", async () => {
      // Arrange
      const currentClipIndex = 1;

      // Act
      changeClip("forward", currentClipIndex, clips, dispatch);

      // Assert
      expect(clipIndexChanged).toHaveBeenCalledWith(currentClipIndex + 1);
      expect(dispatch).toHaveBeenCalledWith(clipIndexChangedAction);
    });
    test("should change the current clip to the next clip", async () => {
      // Arrange

      // Act
      changeClip("forward", currentClipIndex, clips, dispatch);

      // Assert
      expect(clipChanged).toHaveBeenCalledWith(clips[currentClipIndex + 1]);
      expect(dispatch).toHaveBeenCalledWith(clipChangedAction);
    });
  });
  describe("direction: backward", function() {
    test("should change currentClipIndex to one more than its current value", async () => {
      // Arrange
      const currentClipIndex = 1;

      // Act
      changeClip("backward", currentClipIndex, clips, dispatch);

      // Assert
      expect(clipIndexChanged).toHaveBeenCalledWith(currentClipIndex - 1);
      expect(dispatch).toHaveBeenCalledWith(clipIndexChangedAction);
    });
    test("should change the current clip the previous clip", async () => {
      // Arrange
      const currentClipIndex = 1;

      // Act
      changeClip("backward", currentClipIndex, clips, dispatch);

      // Assert
      expect(clipChanged).toHaveBeenCalledWith(clips[currentClipIndex - 1]);
      expect(dispatch).toHaveBeenCalledWith(clipChangedAction);
    });
  });
});
