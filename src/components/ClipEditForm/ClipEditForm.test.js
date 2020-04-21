import React from "react";
import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import { clipChanged } from "redux/clip/clipSlice";
import { clipUpdated } from "redux/clips/clipsSlice";
import { fakeClipBuilder } from "redux/clip/fakeBuilders";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { getClip, getCurrentClipIndex } from "redux/selectors";
import { updateClip } from "components/ClipEditForm/updateClip";
import each from "jest-each";

jest.mock("react-redux");
jest.mock("redux/selectors");
jest.mock("redux/clip/clipSlice");
jest.mock("redux/clips/clipsSlice");
jest.mock("components/ClipEditForm/updateClip");

let dispatch = jest.fn();
let clipChangedReturnValue = Symbol("clip changed return value");
let clipUpdatedReturnValue = Symbol("clip updated return value");
let updateClipReturnValue = Symbol("update clip return value");
let clip;
const currentClipIndex = 2;

describe("ClipEditForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    dispatch.mockName("dispatch");
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(selector => selector());
    clip = fakeClipBuilder();
    getClip.mockName("getClip").mockReturnValue(clip);
    getCurrentClipIndex
      .mockName("getCurrentClipIndex")
      .mockReturnValue(currentClipIndex);
    clipChanged.mockName("clipChanged").mockReturnValue(clipChangedReturnValue);
    clipUpdated.mockName("clipUpdated").mockReturnValue(clipUpdatedReturnValue);
    updateClip.mockName("updateClip").mockReturnValue(updateClipReturnValue);
  });

  test("should display clip properties of the clip passed to it", async () => {
    // Act
    const { getByTestId } = render(<ClipEditForm />);
    const transcriptionInput = getByTestId("transcription-input");
    const startTimeInput = getByTestId("loop-start-time");
    const endTimeInput = getByTestId("loop-end-time");

    // Assert
    expect(transcriptionInput).toHaveValue(clip.transcription);
    expect(startTimeInput).toHaveValue(clip.startTime);
    expect(endTimeInput).toHaveValue(clip.endTime);
  });

  describe("When user enters an empty string in start time input", () => {
    let startTimeInput;
    let getByTestId;
    let queryByTestId;

    beforeEach(async () => {
      // Arrange
      const oldClip = fakeClipBuilder();
      getClip.mockReturnValue(oldClip);

      // Act
      const renderResult = render(<ClipEditForm />);
      ({ getByTestId, queryByTestId } = renderResult);

      startTimeInput = getByTestId("loop-start-time");
      const startTimeInvalidInputMessage = queryByTestId(
        "start-time-invalid-input"
      );

      // Assert
      expect(startTimeInvalidInputMessage).not.toBeInTheDocument();

      // Act
      await userEvent.type(startTimeInput, "", {
        allAtOnce: true
      });
    });

    test("input should display users invalid input", async () => {
      // Assert
      expect(startTimeInput).toHaveValue(null);
    });
    test("no actions should be dispatched", async () => {
      // Assert
      expect(dispatch).not.toHaveBeenCalled();
    });
    test("error message should be displayed", async () => {
      const startTimeInvalidInputMessage = getByTestId(
        "start-time-invalid-input"
      );
      expect(startTimeInvalidInputMessage).toBeInTheDocument();
    });
  });

  describe("updateClip should be dispatched appropriately", () => {
    each([
      ["loop-start-time", "startTime"],
      ["loop-end-time", "endTime"],
      ["transcription-input", "transcription"]
    ]).test("when user changes %s", async (inputTestId, clipProperty) => {
      // Act
      const { getByTestId } = render(<ClipEditForm />);

      const clipInput = getByTestId(inputTestId);

      let newInputValue;
      if (clipInput.type === "number") {
        newInputValue = parseInt(clipInput.value) + 1;
      } else {
        newInputValue = clipInput.value + "!";
      }

      // Act
      await userEvent.type(clipInput, String(newInputValue), {
        allAtOnce: true
      });

      // Assert
      expect(updateClip).toHaveBeenCalledWith(
        {
          ...clip,
          [clipProperty]: newInputValue
        },
        currentClipIndex
      );
      expect(dispatch).toHaveBeenCalledWith(updateClipReturnValue);
    });
  });
});
