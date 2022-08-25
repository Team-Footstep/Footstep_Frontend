import React, { useEffect } from "react";

function useClick(ref, funcOutside, funcInside) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClick(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      funcOutside();
    } else if (ref.current && ref.current.contains(event.target)){
      funcInside();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mouseup", handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleClick);
    };
  });
}

export default useClick;