// DashedLineWithImage.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlurImage from '../ui/BlurImage';

const DashedLineWithImage = () => {
  const dashedLineRef = useRef<HTMLDivElement | null>(null);
  const svgImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const dashedLine = dashedLineRef.current;
    const svgImage = svgImageRef.current;
 
  if (dashedLine) {
    gsap.fromTo(
      dashedLine,
      { opacity: 0, scaleY: 0 },
      {
        opacity: 1,
        scaleY: 1,
        duration: 10,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: dashedLine,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
          markers: false, // Set to true for debugging
          onEnter: () => gsap.fromTo(dashedLine, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 1, ease: 'power2.out' }),
          onLeaveBack: () => gsap.fromTo(dashedLine, { opacity: 1, scaleY: 1 }, { opacity: 0, scaleY: 0, duration: 1, ease: 'power2.out' }),
        }
      }
    );
  }

  // Animation for SVG Image
  if (svgImage) {
    gsap.fromTo(
      svgImage,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: svgImage,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
          markers: false, // Set to true for debugging
          onEnter: () => gsap.fromTo(svgImage, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }),
          onLeaveBack: () => gsap.fromTo(svgImage, { scale: 1, opacity: 1 }, { scale: 0, opacity: 0, duration: 1, ease: 'power2.out' }),
        }
      }
    );
  }
}, []);

  return (
    <div className="absolute  lg:right-14 flex flex-col items-center z-10 top-0">
      <div
        ref={dashedLineRef}
        className="w-0.5 h-0 bg-gray-100 border-dashed border-2 border-black "
        style={{ height: '100px' }} // Ensure height is set correctly
      ></div>
     <div
        ref={svgImageRef}
        className={`opacity-0  -mt-9 w-[15rem] h-[15rem] relative `}
      >
        <BlurImage
          src="https://assets.nesscoindustries.com/public/assets/about/pinkcity/elephant.svg" // Update with your SVG image path
          alt="Elephant"
          layout="intrinsic" // Ensure proper sizing
          width={208} // 13rem in pixels (13 * 16px = 208px)
          height={208} // 13rem in pixels (13 * 16px = 208px)
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default DashedLineWithImage;
