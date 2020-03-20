import { waitFor } from "@testing-library/dom";
import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import React from "react";
import { build, fake } from "@jackfranklin/test-data-bot";
import axios from "axios";
import { renderWithRedux } from "renderWithRedux";
import userEvent from "@testing-library/user-event";

jest.mock("axios");

let clip;
beforeEach(() => {
  jest.resetAllMocks();
  clip = clipBuilder();
});

describe("ClipEditForm", () => {
  test("should display clip properties from the API if a clip id is provided", async () => {
    // Arrange
    axios.get.mockResolvedValue({ data: clip });

    // Act
    const { findByTestId } = renderWithRedux(<ClipEditForm id={clip.id} />);
    const transcriptionInput = await findByTestId("transcription-input");
    const startTimeInput = await findByTestId("loop-start-time");
    const endTimeInput = await findByTestId("loop-end-time");

    // Assert
    await waitFor(() => {
      expect(transcriptionInput).toHaveValue(clip.transcription);
    });
    expect(startTimeInput).toHaveValue(clip.startTime);
    expect(endTimeInput).toHaveValue(clip.endTime);
  });

  test("should not fetch clip data if no clip id is provided", async () => {
    // Act
    renderWithRedux(<ClipEditForm />);

    // Assert
    expect(axios.get).not.toHaveBeenCalled();
  });

  test("should display correct default start time and endtime values", async () => {
    // Arrange
    // Act
    const { getByTestId } = renderWithRedux(<ClipEditForm />);
    const startTimeInput = getByTestId("loop-start-time");
    const endTimeInput = getByTestId("loop-end-time");

    // Assert
    const defaultClipStartTime = 0;
    const defaultClipEndTime = 5;
    expect(startTimeInput).toHaveValue(defaultClipStartTime);
    expect(endTimeInput).toHaveValue(defaultClipEndTime);
  });

  test("should not update redux state if start time or end time are empty", async () => {
    // Act
    const { getByTestId, store } = renderWithRedux(<ClipEditForm />);
    const intialState = store.getState();

    const startTimeInput = getByTestId("loop-start-time");
    const endTimeInput = getByTestId("loop-end-time");

    await userEvent.type(startTimeInput, "", {
      allAtOnce: true
    });
    await userEvent.type(endTimeInput, "", {
      allAtOnce: true
    });

    // Assert
    expect(store.getState()).toStrictEqual(intialState);
  });

  test("should update input values for start Time and end time even if user enters empty string", async () => {
    // Act
    const { getByTestId, store } = renderWithRedux(<ClipEditForm />);

    const startTimeInput = getByTestId("loop-start-time");
    const endTimeInput = getByTestId("loop-end-time");

    await userEvent.type(startTimeInput, "", {
      allAtOnce: true
    });
    await userEvent.type(endTimeInput, "", {
      allAtOnce: true
    });

    // Assert
    expect(startTimeInput).toHaveValue(null);
    expect(endTimeInput).toHaveValue(null);
  });
});
