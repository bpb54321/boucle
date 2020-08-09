import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {ClipEditForm} from "components/ClipEditForm/ClipEditForm";
import React from "react";
import clipBuilder from "../../redux/clips/clipBuilder";
import {renderWithRedux} from "../../renderWithRedux";

let clip;
let clips;
let preloadedState;

describe("ClipEditForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    clips = [clipBuilder(3, 5, "The transcription of the clip")];
    clip = clips[0];
    preloadedState = {
      clips,
      currentClipIndex: 0
    };
  });

  test("should display clip properties of the clip passed to it", async () => {
    const { getByTestId } = renderWithRedux(<ClipEditForm />, preloadedState);

    const transcriptionInput = getByTestId("transcription-input");
    const startTimeInput = getByTestId("loop-start-time");
    const endTimeInput = getByTestId("loop-end-time");

    expect(transcriptionInput).toHaveValue(clip.transcription);
    expect(startTimeInput).toHaveValue(clip.startTime);
    expect(endTimeInput).toHaveValue(clip.endTime);
  });

  test(
    "Input should display user's invalid input and error message should be displayed " +
      "when user enters an empty string in start time input, ",
    async () => {
      renderWithRedux(<ClipEditForm />, preloadedState);

      const startTimeInput = screen.getByTestId("loop-start-time");
      let startTimeInvalidInputMessage = screen.queryByTestId(
        "start-time-invalid-input"
      );

      expect(startTimeInvalidInputMessage).not.toBeInTheDocument();

      await userEvent.type(startTimeInput, "", {
        allAtOnce: true
      });

      startTimeInvalidInputMessage = screen.getByTestId(
        "start-time-invalid-input"
      );
      expect(startTimeInvalidInputMessage).toBeInTheDocument();
      expect(startTimeInput).toHaveValue(null);
    }
  );

  test("start time input should update its value when the user changes it", async () => {
    renderWithRedux(<ClipEditForm />, preloadedState);

    let startTimeInput = screen.getByTestId("loop-start-time");
    const newStartTimeValue = clip.startTime + 1;

    await userEvent.type(startTimeInput, newStartTimeValue.toString(), {
      allAtOnce: true
    });

    expect(startTimeInput).toHaveValue(newStartTimeValue);
  });

  test("end time input should update its value when the user changes it", async () => {
    renderWithRedux(<ClipEditForm />, preloadedState);

    let endTimeInput = screen.getByTestId("loop-end-time");

    const newEndTimeValue = parseInt(endTimeInput.value) + 1;

    await userEvent.type(endTimeInput, newEndTimeValue.toString(), {
      allAtOnce: true
    });

    expect(endTimeInput).toHaveValue(newEndTimeValue);
  });

  test("transcription input should update its value when the user changes it", async () => {
    renderWithRedux(<ClipEditForm />, preloadedState);

    let transcriptionInput = screen.getByTestId("transcription-input");
    const newTranscriptionValue = transcriptionInput.value + "!";

    await userEvent.type(transcriptionInput, newTranscriptionValue, {
      allAtOnce: true
    });

    expect(transcriptionInput).toHaveValue(newTranscriptionValue);
  });
});
