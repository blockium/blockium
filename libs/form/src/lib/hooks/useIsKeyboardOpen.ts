import { useEffect, useRef, useState } from "react";

export const useIsKeyboardOpen: (height: number) => boolean = (
  height: number
) => {
  const prevHeight = useRef(0);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    // Check if keyboard was open or closed
    if (prevHeight.current - height > 200) {
      // open
      setOpen(true);
    } else if (prevHeight.current - height < -200) {
      // or closed
      setOpen(false);
    }

    prevHeight.current = height;
  }, [height]);

  return isOpen;
};
