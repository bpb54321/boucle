import React from "react";

function NavigationButton({ buttonAction }) {
  return (
    <button onClick={buttonAction} data-testid={"navigation-button"}>
      Button
    </button>
  );
}

export default NavigationButton;
