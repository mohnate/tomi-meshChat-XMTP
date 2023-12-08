import { useState } from "react";

export const useLongPress = (
  onLongPress: () => void,
  onClick: () => void,
  ms = 1000,
) => {
  let timerId: string | number | NodeJS.Timeout | undefined;
  const [isLongPress, setLongPress] = useState(false);

  const start = () => {
    timerId = setTimeout(() => {
      setLongPress(true);
    }, ms);
  };

  const clear = () => {
    // Clear timeout if the user releases before the time limit
    clearTimeout(timerId);
    // // If the timer didn't exceed the ms, it's a click
    if (!isLongPress) onClick();
    if (isLongPress) {
      onLongPress();
      setLongPress(false);
    }
  };

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  };
};
