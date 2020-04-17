import React from "react";

function NavigationButton({ buttonAction, text }) {
  return (
    <button onClick={buttonAction} data-testid={"navigation-button"}>
      {text}
    </button>
  );
}

export default NavigationButton;
