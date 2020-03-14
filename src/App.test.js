import React from "react";
import { render, wait } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("App", () => {
  test("should not display a clip edit form by default", async () => {
    // Act
    const { queryByTestId } = render(<App />);

    // Assert
    expect(queryByTestId("clip-edit-form")).not.toBeInTheDocument();
  });
});
