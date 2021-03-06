import { updateClip } from "components/ClipEditForm/updateClip";
import clipService from "../../redux/clip/clipService";
import fakeClipBuilder from "../../redux/clips/fakeClipBuilder";
import { clipChanged } from "../../redux/clip/clipSlice";
import { clipUpdated } from "../../redux/clips/clipsSlice";

jest.mock("../../redux/clip/clipSlice");
jest.mock("../../redux/clips/clipsSlice");
jest.mock("../../redux/clip/clipService");

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
    await updateClip(clip, clipIndexToUpdate)(dispatch);

    // Assert
    expect(clipChanged).toHaveBeenCalledWith(clip);
    expect(dispatch).toHaveBeenCalledWith(clipChangedReturnValue);
  });
  test("dispatches clipUpdated with the clip and index passed in", async () => {
    // Act
    await updateClip(clip, clipIndexToUpdate)(dispatch);

    // Assert
    expect(clipUpdated).toHaveBeenCalledWith({ clip, clipIndexToUpdate });
    expect(dispatch).toHaveBeenCalledWith(clipUpdatedReturnValue);
  });
  test("calls clipService.updateClip with the clip to update", async () => {
    // Act
    await updateClip(clip, clipIndexToUpdate)(dispatch);

    // Assert
    expect(clipService.updateClip).toHaveBeenCalledWith(clip);
  });
});
