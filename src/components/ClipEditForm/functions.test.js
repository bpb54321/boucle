import { dispatchClipOrMarkInvalid } from "./functions";
import { fakeClipBuilder } from "../../redux/clip/fakeBuilders";
import { clipChanged } from "../../redux/clip/clipSlice";
import { clipUpdated } from "../../redux/clips/clipsSlice";

jest.mock("../../redux/clip/clipSlice");
jest.mock("../../redux/clips/clipsSlice");

describe("dispatchClipOrMarkInvalid", function() {
  describe("When clip is valid", function() {
    let clip;
    let setInputIsValid;
    let setLocalClipState;
    let dispatch;
    const clipChangedReturnValue = Symbol("clip changed return value");
    const clipUpdatedReturnValue = Symbol("clip updated return value");
    beforeEach(() => {
      jest.restoreAllMocks();
      clip = fakeClipBuilder();
      setInputIsValid = jest.fn().mockName("setInputIsValid");
      setInputIsValid.mockReturnValue(true);
      setLocalClipState = jest.fn().mockName("setLocalClipState");
      dispatch = jest.fn().mockName("dispatch");

      clipChanged
        .mockName("clipChanged")
        .mockReturnValue(clipChangedReturnValue);
      clipUpdated
        .mockName("clipUpdated")
        .mockReturnValue(clipUpdatedReturnValue);
    });
    test("sets input as valid", async () => {
      // Act
      dispatchClipOrMarkInvalid(
        clip,
        0,
        setInputIsValid,
        setLocalClipState,
        dispatch
      );

      // Assert
      expect(setInputIsValid).toHaveBeenCalledWith(true);
    });
    test("dispatches clipChanged action with the clip passed in", async () => {
      // Act
      dispatchClipOrMarkInvalid(
        clip,
        0,
        setInputIsValid,
        setLocalClipState,
        dispatch
      );

      // Assert
      expect(clipChanged).toHaveBeenCalledWith(clip);
      expect(dispatch).toHaveBeenCalledWith(clipChangedReturnValue);
    });
    test("dispatches clipUpdated with the clip and index passed in", async () => {
      // Arrange
      const clipIndexToUpdate = Math.floor(Math.random() * 10);

      // Act
      dispatchClipOrMarkInvalid(
        clip,
        clipIndexToUpdate,
        setInputIsValid,
        setLocalClipState,
        dispatch
      );

      // Assert
      expect(clipUpdated).toHaveBeenCalledWith({clip, clipIndexToUpdate});
      expect(dispatch).toHaveBeenCalledWith(clipUpdatedReturnValue);
    });
  });
});
