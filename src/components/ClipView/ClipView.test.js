import { ClipView } from "components/ClipView/ClipView";
import { render } from "@testing-library/react";
import React from "react";

describe("ClipView", () => {
  test("should display clip properties from the API", async () => {
    // Arrange
    const { findByTestId } = render(<ClipView />);

    // Act
    const transcriptionInput = await findByTestId("transcription-input");

    // Assert
    expect(transcriptionInput).toHaveValue("test transcription");
  });
});
