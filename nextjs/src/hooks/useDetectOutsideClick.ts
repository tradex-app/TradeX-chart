import { useState, useEffect } from "react";

const useDetectOutsideClick = (el, initialState) => {
  const [isOpened, setIsOpened] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      // If the active element exists and is clicked outside of

      if (el.current !== null && !el.current.contains(e.target)) {
        setIsOpened(!isOpened);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isOpened) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpened, el]);

  return [isOpened, setIsOpened];
};

export default useDetectOutsideClick;
