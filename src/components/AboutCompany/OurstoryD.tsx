"use client";
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styles from './Story.module.css';
import { OurCompanyItem } from "./types/constant";

interface AboutLayoutProps {
  companyData: OurCompanyItem;
}

const OurStoryD: React.FC<AboutLayoutProps> = ({ companyData }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1.1);
  const [borderRadius, setBorderRadius] = useState(0);
  const homecompanyData = companyData?.Ourcompany[0]?.ourStoryContent;

  useEffect(() => {
    console.log(homecompanyData?.paragraphs?.paragraph)
  }, [homecompanyData?.paragraphs?.paragraph])

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;
  
      const rect = imageRef.current.getBoundingClientRect();
      const scrollProgress = 1 - (rect.bottom / window.innerHeight);
      
      // Smoothly interpolate scale from 1.1 to 1.0
      const newScale = 1.1 - (scrollProgress * 0.1);
      setScale(Math.max(1, newScale));
      
      // Smoothly interpolate border-radius from 0 to 20
      const newBorderRadius = scrollProgress * 20;
      setBorderRadius(Math.min(20, Math.max(0, newBorderRadius)));
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>{homecompanyData?.title}</title>
      </Head>
      <div className="relative h-full text-white px-4 mb-36 lg:mt-[8rem]">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
          <h2 className="lg:text-3xl text-2xl font-poppins font-medium text-white mt-20">
            {homecompanyData?.title}
            <span className='text-red-600'> {homecompanyData?.highlight}</span>
          </h2>
          <div className="mb-10 max-w-4xl mx-auto mt-6 font-poppins text-sm font-regular text-white">
            {` Since our inception in 1978, Nessco India has been dedicated to delivering top-quality machinery to the disposable industry. Our journey began with a vision to provide innovative solutions that meet the evolving needs of our clients. Over the years, we have expanded our product range and enhanced our manufacturing capabilities, establishing ourselves as a trusted name in the market. Our commitment to excellence is reflected in our state-of-the-art R&D team, which continually strives to develop cutting-edge technologies. With a focus on customer satisfaction, we have built lasting relationships and garnered acclaim for our reliable and efficient machines. Today, Nessco India stands as a leader in the disposable industry, driven by a passion for innovation and a dedication to quality.`}
          </div>
          <div className="flex justify-center w-full h-auto mt-14 overflow-x-clip">
            <div
              ref={imageRef}
              className={`${styles.scaleup} w-full max-w-4xl aspect-video`}
              style={{
                overflow: 'hidden',
                transform: `scale(${scale})`,
                borderRadius: `${borderRadius}px`,
                transition: 'transform 0.1s ease-out, border-radius 0.1s ease-out',
              }}
            >
              <video
                id="background-video"
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                loop
                muted
                preload="metadata"
                poster={homecompanyData?.image?.src}
              >
                <source src={homecompanyData?.image?.src} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurStoryD;

