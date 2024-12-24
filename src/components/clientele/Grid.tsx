"use client";

import React, { useState, useEffect } from "react";
import styles from "./client.module.css";
import { ClienteleItem, Square } from "./types/constant";
import BlurImage from "../ui/BlurImage";

interface ShuffleGridProps {
  clienteleData: ClienteleItem;
}

// Utility function to get a sliding animation class
const getSlidingDirectionClass = (): string => {
  const directions = [
    styles["animation-slide-in-left"],
    styles["animation-slide-in-right"],
    styles["animation-slide-in-top"],
    styles["animation-slide-in-bottom"],
  ];
  return directions[Math.floor(Math.random() * directions.length)];
};

// Generate square components
const generateSquares = (data: Square[], isFadingOut: boolean) => {
  return data?.map((sq) => {
    const animationClass = getSlidingDirectionClass();
    return (
      <div
        key={sq.id}
        className={`relative border border-[#262626] rounded-[0.8rem] flex items-center justify-center overflow-hidden 
        ${sq.bgClass} 
        ${isFadingOut ? "opacity-0" : "opacity-100"} 
        transition-opacity duration-4000 ease-in-out`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center lg:p-0 p-3 ${animationClass}`}
        >
          <BlurImage
            src={sq.src}
            alt={`image-${sq.id}`}
            width={110}
            height={110}
            className="transform transition-transform duration-4000 invert brightness-0"
          />
        </div>
      </div>
    );
  });
};

// Main ShuffleGrid component
const ShuffleGrid: React.FC<ShuffleGridProps> = ({ clienteleData }) => {
  const homegridData: Square[] = clienteleData?.Clientele[0]?.squares || [];
  const [squares, setSquares] = useState(() =>
    generateSquares(homegridData, false)
  );
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const shuffleSquares = () => {
      setIsFadingOut(true);

      setTimeout(() => {
        setSquares(generateSquares(homegridData, false));
        setIsFadingOut(false);
      }, 4000);
    };

    const interval = setInterval(shuffleSquares, 8000);

    return () => clearInterval(interval);
  }, [homegridData]);

  return (
    <div className="lg:h-[40rem] lg:w-full w-full h-[40rem] bg-black lg:p-10">
      <div
        className={`grid lg:grid-cols-4 grid-cols-2 lg:gap-3 gap-2 lg:h-full lg:w-full h-full w-full ${
          isFadingOut ? "fade-out" : "fade-in"
        }`}
      >
        {squares}
      </div>
    </div>
  );
};

export default ShuffleGrid;
