"use client";
import { useState, useEffect } from "react";

// Function to determine screen size based on width
const getScreenSize = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth;
  }
  return 0; // or any default width
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);

    // Initial update for screen size
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
