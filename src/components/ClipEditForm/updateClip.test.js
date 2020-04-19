import { updateClip } from "components/ClipEditForm/updateClip";
import { fakeClipBuilder } from "../../redux/clip/fakeBuilders";
import { clipChanged } from "../../redux/clip/clipSlice";
import { clipUpdated } from "../../redux/clips/clipsSlice";

jest.mock("../../redux/clip/clipSlice");
jest.mock("../../redux/clips/clipsSlice");

describe("updateClip", function() {
  let clip;
  let dispatch;
  const clipChangedReturnValue = Symbol("clip changed return value");
  const clipUpdatedReturnValue = Symbol("clip updated return value");
  let clipIndexToUpdate;
  beforeEach(() => {
    jest.restoreAllMocks();
    clip = fakeClipBuilder();
    clipIndexToUpdate = Math.floor(Math.random() * 10);
    dispatch = jest.fn().mockName("dispatch");
    clipChanged.mockName("clipChanged").mockReturnValue(clipChangedReturnValue);
    clipUpdated.mockName("clipUpdated").mockReturnValue(clipUpdatedReturnValue);
  });
  test("dispatches clipChanged action with the clip passed in", async () => {
    // Act
    updateClip(clip, clipIndexToUpdate, dispatch);

    // Assert
    expect(clipChanged).toHaveBeenCalledWith(clip);
    expect(dispatch).toHaveBeenCalledWith(clipChangedReturnValue);
  });
  test("dispatches clipUpdated with the clip and index passed in", async () => {
    // Act
    updateClip(clip, clipIndexToUpdate, dispatch);

    // Assert
    expect(clipUpdated).toHaveBeenCalledWith({ clip, clipIndexToUpdate });
    expect(dispatch).toHaveBeenCalledWith(clipUpdatedReturnValue);
  });
});
