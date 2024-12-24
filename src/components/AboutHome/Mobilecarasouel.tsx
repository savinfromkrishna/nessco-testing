"use client";

import { FC, useEffect, useState } from 'react';
import BlurImage from "../ui/BlurImage";
import { AboutItem } from './types/constant';
interface HomeLayoutProps{
  aboutData:AboutItem;
}
const MobileCarousel:FC <HomeLayoutProps>= ({aboutData}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const homeaboutData=aboutData?.About[0]?.companyContent

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSliding) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % homeaboutData.imageWithDescription.length);
      }
    }, 9000); // Auto-slide every 9 seconds
    return () => clearInterval(interval);
  }, [isSliding]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeThreshold = 50; // Minimum swipe distance to trigger the change

    if (!isSliding && Math.abs(touchStartX - touchEndX) > swipeThreshold) {
      setIsSliding(true);

      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left
        setCurrentIndex((prevIndex) => (prevIndex + 1) % homeaboutData.imageWithDescription.length);
      } else if (touchStartX - touchEndX < -swipeThreshold) {
        // Swipe right
        setCurrentIndex(
          (prevIndex) =>
            (prevIndex - 1 + homeaboutData.imageWithDescription.length) % homeaboutData.imageWithDescription.length
        );
      }

      // Allow sliding again after the transition
      setTimeout(() => setIsSliding(false), 300); // Debouncing to avoid rapid swipes
    }
  };

  return (
    <div className='h-[50%] md:h-[64%] w-full p-8'>
    <div className="bg-gray-200 bg-opacity-45 lg:py-[2.5vh] lg:px-[1vw] p-4 rounded-[1rem] overflow-hidden ">
      <div
        className="relative h-[16rem] w-full md:h-[25rem] overflow-hidden rounded-md"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {homeaboutData?.imageWithDescription?.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentIndex
                ? 'transform translate-x-0'
                : index > currentIndex
                ? 'transform translate-x-full'
                : 'transform -translate-x-full'
            }`}
          >
            <BlurImage
              src={image?.img}
              alt={`Slide ${index}`}
              height={200}
              width={200}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-3 -mb-2">
        {homeaboutData?.imageWithDescription?.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default MobileCarousel;
