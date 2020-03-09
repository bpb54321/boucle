import { ClipView } from "components/ClipView/ClipView";
import { render } from "@testing-library/react";
import React from "react";
import { build, fake } from "@jackfranklin/test-data-bot";
import axios from "axios";

jest.mock("axios");
describe("ClipView", () => {
  test("should display clip properties from the API", async () => {
    // Arrange
    const clipBuilder = build("Clip", {
      fields: {
        transcription: fake(f => f.lorem.lines(2))
      }
    });
    const clip = clipBuilder();
    axios.get.mockResolvedValue({ data: clip });

    const { findByTestId } = render(<ClipView />);

    // Act
    const transcriptionInput = await findByTestId("transcription-input");

    // Assert
    expect(transcriptionInput).toHaveValue(clip.transcription);
  });
});
