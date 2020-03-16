import { waitFor } from "@testing-library/dom";
import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import React from "react";
import { build, fake } from "@jackfranklin/test-data-bot";
import axios from "axios";
import { renderWithRedux } from "renderWithRedux";

jest.mock("axios");

const clipBuilder = build("Clip", {
  fields: {
    id: fake(f => f.random.number({ min: 1, max: 20 })),
    transcription: fake(f => f.lorem.lines(2)),
    startTime: fake(f => f.random.number({ min: 0, max: 10 })),
    endTime: fake(f => f.random.number({ min: 11, max: 20 }))
  }
});

let clip;
beforeEach(() => {
  jest.resetAllMocks();
  clip = clipBuilder();
});

describe("ClipEditForm", () => {
  test("should display clip properties from the API", async () => {
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
});
