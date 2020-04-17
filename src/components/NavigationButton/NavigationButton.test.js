import React from "react";
import NavigationButton from "components/NavigationButton/NavigationButton";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("NavigationButton", () => {
  test("should call button action function", async () => {
    // Arrange
    const buttonAction = jest.fn().mockName("buttonAction");

    // Act
    const { getByTestId } = render(
      <NavigationButton buttonAction={buttonAction} />
    );
    expect(buttonAction).not.toHaveBeenCalled();

    const button = getByTestId("navigation-button");
    userEvent.click(button);

    // Assert
    expect(buttonAction).toHaveBeenCalled();
  });
});
