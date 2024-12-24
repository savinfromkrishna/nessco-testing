import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Bird = () => {
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
          markers: false, 
          onEnter: () => gsap.fromTo(svgImage, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }),
          onLeaveBack: () => gsap.fromTo(svgImage, { scale: 1, opacity: 1 }, { scale: 0, opacity: 0, duration: 1, ease: 'power2.out' }),
        }
      }
    );
  }
}, []);

  return (
    <div className="absolute lg:left-10 lg:top-0 top-0 flex flex-col items-center z-10 md:top-0 md:left-[20rem]">
      <div
        ref={dashedLineRef}
        className="w-0.2 h-0 bg-gray-100 border-dashed border-2 border-gray-800 "
        style={{ height: '100px' }} 
      ></div>
     <div
        ref={svgImageRef}
        className={`opacity-0  w-[15rem] h-[15rem] relative `}
      >
        <Image
          src="https://assets.nesscoindustries.com/public/assets/about/pinkcity/bird.svg"
          alt="bird"
            ref={svgImageRef}
          layout="intrinsic" 
          width={508} 
          height={608} 
          className="scale-150 -mt-10"
        />
      </div>
    </div>
  );
};

export default Bird;
