"use client"

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  blockClassName?: string;
  animationDuration?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = 'text-base font-regular',
  blockClassName = 'bg-white h-full',
  animationDuration = 700
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const block = blockRef.current;

    if (!container || !block) {
      console.error('Container or block element not found');
      return;
    }

    const handleAnimation = () => {
      if (hasAnimated) return;

      const slideInDuration = animationDuration * 0.57; // 57% of total duration
      const slideOutDuration = animationDuration * 0.43; // 43% of total duration

      // Reset the block's initial state
      block.style.transition = 'none';
      block.style.width = '0%';
      block.style.left = '0%';

      // Force a reflow to ensure the initial state is applied
      block.offsetWidth;

      // Animate the block sliding over the text
      block.style.transition = `width ${slideInDuration}ms cubic-bezier(0.74, 0.06, 0.4, 0.92), left ${slideOutDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      block.style.width = '100%';

      // Use setTimeout to delay the second part of the animation
      setTimeout(() => {
        block.style.width = '0%';
        block.style.left = '100%';
      }, slideInDuration);

      // Mark animation as completed
      setHasAnimated(true);
    };

    // IntersectionObserver to detect when the element enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            handleAnimation();
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    observer.observe(container);

    // Clean up on component unmount
    return () => {
      observer.disconnect();
    };
  }, [animationDuration, hasAnimated]);

  return (
    <div ref={containerRef} className="relative flex flex-col justify-center w-auto overflow-hidden">
      <div className="relative flex items-center justify-center w-full h-auto text-white font-bold font-poppins">
        <span 
          ref={blockRef}
          className={`block absolute ${blockClassName}`}
          style={{ pointerEvents: 'none' }}
        ></span>
        <h2 className={className}>
          {text}
        </h2>
      </div>
    </div>
  );
};

export default AnimatedText;