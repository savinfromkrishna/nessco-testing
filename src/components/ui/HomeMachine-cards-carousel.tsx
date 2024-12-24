"use client";

import React, {
  useEffect,
  useState,
  createContext,
  useCallback,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const checkScrollability = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addListener(handleResize);

    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }

    return () => mediaQuery.removeListener(handleResize);
  }, [initialScroll, checkScrollability]);

  const scrollLeft = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  }, []);

  const handleCardClose = useCallback(
    (index: number) => {
      if (carouselRef.current) {
        const cardWidth = isMobile ? 230 : 384;
        const gap = isMobile ? 4 : 8;
        const scrollPosition = (cardWidth + gap) * (index + 1);
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
        setCurrentIndex(index);
      }
    },
    [isMobile]
  );

  const contextValue = useMemo(
    () => ({ onCardClose: handleCardClose, currentIndex }),
    [handleCardClose, currentIndex]
  );

  const renderCarouselItems = useCallback(
    (start: number, end: number) => (
      <div className={cn("flex flex-row gap-4 pl-[2%]", "max-w-7xl mx-auto")}>
        {items.slice(start, end).map((item, index) => (
          <div
            key={`card-${start + index}`}
            className="last:pr-[5%] md:last:pr-[4%] rounded-3xl"
          >
            {item}
          </div>
        ))}
      </div>
    ),
    [items]
  );

  const carouselContent = useMemo(() => {
    if (items.length <= 5) {
      return (
        <>
          <div className="relative mt-14 lg:ml-14">
            {renderCarouselItems(0, items.length)}
          </div>
        </>
      );
    } else if (items.length <= 10) {
      return (
        <>
          <div className="relative mt-12 w-full">
            {renderCarouselItems(
              0,
              Math.ceil(items.length / 2) + (5 - Math.ceil(items.length / 2))
            )}
          </div>
          <div className="relative w-full mt-4">
            {renderCarouselItems(5, items.length)}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="relative mt-12 w-full">
            {renderCarouselItems(0, (items.length / 2)+1)}
          </div>
          <div className="relative w-full mt-4">
            {renderCarouselItems(items.length / 2, items.length)}
          </div>
        </>
      );
    }
  }, [items, renderCarouselItems]);

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        className={cn(
          "w-full overflow-x-scroll overscroll-x-auto py-4 md:py-4 scroll-smooth [scrollbar-width:none]",
          items?.length > 5 ? "grid grid-rows-2" : "flex"
        )}
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        {carouselContent}
      </div>
      {items?.length > 10 && (
        <div className="flex justify-end gap-2 mr-10">
          <button
            aria-label="scrollLeft"
            className="relative z-20 h-6 w-6 bg-[#9e9c9c] lg:hover:bg-black rounded-full flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            aria-label="scrollRight"
            className="relative z-20 h-6 w-6 bg-[#9e9c9c] lg:hover:bg-black rounded-full flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </CarouselContext.Provider>
  );
};

export default Carousel;
