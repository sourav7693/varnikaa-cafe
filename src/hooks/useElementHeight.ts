import { useState, useEffect, useRef } from "react";

const useElementHeight = <T extends HTMLElement>() => {
  const [height, setHeight] = useState(0);
  const elementRef = useRef<T | null>(null);

  const updateHeight = () => {
    if (elementRef.current) {
      setHeight(elementRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    updateHeight();

    const handleResize = () => {
      updateHeight();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [height, elementRef] as const;
};

export default useElementHeight;