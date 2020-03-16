import React from "react";
import App from "./App";
import { renderWithRedux } from "renderWithRedux";

describe("App", () => {
  test("should not display a clip edit form by default", async () => {
    // Act
    const { queryByTestId } = renderWithRedux(<App />);

    // Assert
    expect(queryByTestId("clip-edit-form")).not.toBeInTheDocument();
  });
});
