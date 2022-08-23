import React, { useState } from "react";

function useDisplayToggle (initialDisplay, handleDisplay) {
  const [display, setDisplay] = useState(initialDisplay);
  handleDisplay = (event) => {
    event.preventDefault();
    setDisplay((prev) => !prev);
    return display;
  };
}

export default useDisplayToggle;