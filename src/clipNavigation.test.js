import { advanceToNextClip } from "clipNavigation";
import { clipChanged } from "redux/clip/clipSlice";
import { clipIndexChanged } from "redux/clips/clipsSlice";
import { fakeClipsBuilder } from "redux/clip/fakeBuilders";

jest.mock("redux/clip/clipSlice");
jest.mock("redux/clips/clipsSlice");

describe("advanceToNextClip", () => {
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
  test("should change currentClipIndex to one more than its current value", async () => {
    // Arrange
    const currentClipIndex = 1;

    // Act
    advanceToNextClip(dispatch, currentClipIndex, clips);

    // Assert
    expect(clipIndexChanged).toHaveBeenCalledWith(currentClipIndex + 1);
    expect(dispatch).toHaveBeenCalledWith(clipIndexChangedAction);
  });
  test("should change the current clip to clips[currentClipIndex + 1]", async () => {
    // Arrange

    // Act
    advanceToNextClip(dispatch, currentClipIndex, clips);

    // Assert
    expect(clipChanged).toHaveBeenCalledWith(clips[currentClipIndex + 1]);
    expect(dispatch).toHaveBeenCalledWith(clipChangedAction);
  });
});
