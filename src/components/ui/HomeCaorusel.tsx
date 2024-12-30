"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HomeData } from "../Home/types/constant";

interface VideoCarouselProps {
  heroData?: HomeData;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ heroData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? heroData?.home?.[1]?.data?.video?.sources?.length - 1
        : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === heroData?.home?.[1]?.data?.video?.sources?.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mx-auto h-full overflow-hidden rounded-2xl">
      <AnimatePresence initial={false}>
        {heroData?.home?.[1]?.data?.video?.sources?.map((video, index) => (
          <motion.div
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 30 }}
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              autoPlay={index === currentIndex}
              src={video?.src}
              loop
              muted
              playsInline
              preload="metadata" // load only metadata to reduce initial load time
              poster="../../../public/HomeMain.png"
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-[4rem] lg:top-1/3 lg:left-20  text-white z-10">
              <h1 className="lg:text-5xl md:text-5xl sm:text-4xl text-3xl text-center font-semibold mb-2">
                {video?.headline}
              </h1>
              <p className="lg:text-4xl md:text-4xl lg:text-left text-center sm:text-3xl text-xl italic w-full">
                {video?.subheadline}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {heroData?.home?.[1]?.data?.video?.sources?.length > 1 && (
        <div className="absolute bottom-2 left-[5.5rem] lg:bottom-8 lg:left-1/2 transform -translate-x-1/2 flex items-center space-x-2 lg:space-x-4">
          <button
            onClick={goToPrevious}
            className="bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ChevronLeft className="lg:w-6 lg:h-6 w-4 h-4 text-white" />
          </button>

          <div className="flex space-x-1 lg:space-x-3">
            {heroData?.home?.[1]?.data?.video?.sources?.map((_, index) => (
              <div
                key={index}
                className={`relative ${
                  index === currentIndex
                    ? "w-8 lg:w-16 h-[0.3rem]"
                    : "w-[0.3rem] h-[0.3rem]"
                } rounded-full transition-all duration-300 ease-in-out overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 ${
                    index === currentIndex ? "bg-white/30" : "bg-white/50"
                  } rounded-full`}
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-white rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    style={{ originX: 0 }}
                    onAnimationComplete={goToNext}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={goToNext}
            className="bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ChevronRight className="lg:w-6 lg:h-6 w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;
