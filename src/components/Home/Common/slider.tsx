"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { HomeData } from "../types/constant";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const AUTO_SCROLL_INTERVAL = 10000; // 10 seconds

interface ImageSliderLayoutProps {
  heroData: HomeData;
}

export const SwipeCarousel: React.FC<ImageSliderLayoutProps> = ({
  heroData,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentVideoLink, setCurrentVideoLink] = useState<string>("");
  const testinomialData = heroData?.home[8]?.data;
  const testimonialItems = testinomialData?.Testinomialvideos || [];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [emblaApi]);

  const openModal = (videoSrc: string) => {
    setIsModalOpen(true);
    setCurrentVideoLink(videoSrc);
  };

  const RipplePlayButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="ripple-block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden"
    >
      <Play className="absolute left-1/2 top-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 -translate-x-1/2 -translate-y-1/2 text-white transition-colors duration-300 group-hover:text-white/90" />
      <div className="ripple"></div>
      <div className="ripple animation-delay-400"></div>
      <div className="ripple animation-delay-800"></div>
    </button>
  );

  return (
    <>
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0.2);
            opacity: 0;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        .ripple {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          animation: ripple 2s infinite ease-in-out;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .embla {
          overflow: hidden;
        }

        .embla__container {
          display: flex;
        }

        .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
          padding-left: 1rem;
          padding-right: 1rem;
        }

        @media (min-width: 640px) {
          .embla__slide {
            flex: 0 0 90%;
          }
        }

        @media (min-width: 1024px) {
          .embla__slide {
            flex: 0 0 80%;
          }
        }

        @media (min-width: 1280px) {
          .embla__slide {
            flex: 0 0 70%;
          }
        }
      `}</style>
      <div className="relative w-full mt-6 overflow-hidden">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container space-x-4 px-4">
            {testimonialItems?.map((video, idx) => (
              <div key={idx} className="embla__slide">
                <div className="relative h-36 w-full lg:w-[17rem] aspect-video rounded-xl overflow-hidden shadow-lg">
                  <video
                    src={video.src}
                    autoPlay={selectedIndex === idx}
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <RipplePlayButton onClick={() => openModal(video.src)} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-4 items-center justify-center mt-6">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={scrollPrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={scrollNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] p-0 overflow-hidden rounded-xl">
            <div className="relative w-full pt-[56.25%] bg-black">
              <video
                src={currentVideoLink}
                controls
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            <DialogClose className="absolute top-2 right-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
