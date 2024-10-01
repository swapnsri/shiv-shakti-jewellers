"use client";
import { setImages } from "@/app/banner-images/data";
import React, { useEffect, useState } from "react";

export const Banner = () => {
  const [imagesIndex, setImagesIndex] = useState(0);
  const [animationCycleComplete, setAnimationCycleComplete] = useState(false);

  useEffect(() => {
    const onAnimationIteration = () => {
      setAnimationCycleComplete(true);
    };

    const animationElement = document.querySelector(".animation-text");

    if (animationElement) {
      animationElement.addEventListener(
        "animationiteration",
        onAnimationIteration,
      );
    }

    return () => {
      if (animationElement) {
        animationElement.removeEventListener(
          "animationiteration",
          onAnimationIteration,
        );
      }
    };
  }, []);

  useEffect(() => {
    if (animationCycleComplete) {
      console.log("Animation cycle complete. Changing text...");
      setAnimationCycleComplete(false);

      if (setImages.length > 0) {
        setImagesIndex((prevIndex) => (prevIndex + 1) % setImages.length);
      }
    }
  }, [animationCycleComplete]);

  return (
    <>
      <div className="banner-image ">
        <div className="animation-text animate-slide"></div>
        <div
          className="bg-cover bg-center h-[600px]"
          style={{ backgroundImage: `url(${setImages[imagesIndex].src.src})` }}
        ></div>
        <div className="flex justify-center mt-4 relative -top-12 ">
          <div className="flex justify-center gap-2 sm:max-w-[200px] overflow-hidden">
            {setImages.map((_, index) => (
              <div key={index}>
                <svg
                  onClick={() => {
                    setImagesIndex(index);
                  }}
                  className={`dot ${index === imagesIndex ? "active" : ""}`}
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  width={index === imagesIndex ? "24" : "8"}
                  height="10"
                  viewBox={`0 0 ${index === imagesIndex ? "24" : "8"} 8`}
                  fill="none"
                >
                  <rect
                    x={index === imagesIndex ? "0.5" : "0"}
                    y="0.5"
                    width={index === imagesIndex ? "23" : "8"}
                    height="8"
                    rx={index === imagesIndex ? "5" : "4"}
                    fill={index === imagesIndex ? "#FFAF37" : ""}
                    stroke={index === imagesIndex ? "" : "var(--brand-color1)"}
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
