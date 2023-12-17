import { useEffect, useRef } from "react";

export const useFillHeight = (
  adjustHeightOnResize: boolean,
  callback?: (height: number) => void
) => {
  const ref = useRef<HTMLDivElement>(null);

  // Fixes Chrome doesn't work with css min-height: fill-available.
  useEffect(() => {
    const setHeight = () => {
      const element = ref.current;
      const height = window.innerHeight;
      if (element) {
        element.style.height = height + "px";
      }
      callback?.(height);
    };

    setHeight();

    if (adjustHeightOnResize) {
      window.addEventListener("resize", setHeight);
      return () => {
        window.removeEventListener("resize", setHeight);
      };
    }
  }, [adjustHeightOnResize, callback]);

  return ref;
};
