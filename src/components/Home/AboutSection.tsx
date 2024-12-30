'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import dynamic from 'next/dynamic';
import styles from '../ui/AnimatedText.module.css';
import { HomeData } from './types/constant';

const BlurImage = dynamic(() => import('../ui/BlurImage'), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded-2xl h-full w-full" />,
});

const AnimatedText = dynamic(() => import('../ui/AnimatedText'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-6 w-24 rounded" />,
});



interface AboutUsProps {
  heroData: HomeData;
}

const AboutUs: React.FC<AboutUsProps> = ({ heroData }) => {
  const aboutData = heroData?.home[3]?.data;
  const [animatedMachinesSold, setAnimatedMachinesSold] = useState(0);
  const [animatedReadyStockMachines, setAnimatedReadyStockMachines] = useState(0);
  const [machinesSoldComplete, setMachinesSoldComplete] = useState(false);
  const [readyStockMachinesComplete, setReadyStockMachinesComplete] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || '';
  const [countryCode, languageCode] = pathname.split('/').slice(1, 3).map(code => code.toLowerCase());
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start' });

  useEffect(() => {
    if (!aboutData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMachinesSoldComplete(false);
            setReadyStockMachinesComplete(false);
            animateCount(setAnimatedMachinesSold, aboutData.stats.machinesSold, setMachinesSoldComplete);
            animateCount(setAnimatedReadyStockMachines, aboutData.stats.readyStockMachines, setReadyStockMachinesComplete);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [aboutData]);

  const animateCount = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    endValue: number,
    completionSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    let startTime: number;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setter(Math.floor(progress * endValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        completionSetter(true);
      }
    };

    window.requestAnimationFrame(step);
  };

  if (!aboutData) return null;

  return (
    <div className="flex mt-8 pb-12 h-full max-w-screen-2xl mx-auto flex-col items-center px-4 lg:px-14 bg-gradient-to-b from-transparent to-[#ece9f5] relative">
      <div className="absolute top-48 h-full w-full bg-[radial-gradient(#9e9c9c_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      
      {/* Hero Section */}
      <h2 className="text-3xl font-medium text-[#483d78] flex justify-center z-10">
        <span className="font-semibold">{aboutData.title.trim().replace(/\s+\S+$/, '')}</span>
        <span className="font-semibold ml-2">{aboutData.title.trim().match(/\S+$/)}</span>
      </h2>
      <h2 className="text-lg lg:text-2xl w-full text-center font-poppins lg:px-72 py-3">
        {aboutData.heading.split(' ').map((word, index) =>
          word === 'Machine' ? (
            <Link
              key={index}
              className="text-[#483d78] cursor-pointer"
              href={`/${countryCode}/${languageCode}/products`}
            >
              {word}{' '}
            </Link>
          ) : (
            word + ' '
          )
        )}
      </h2>

      <div className="text-center flex flex-col w-full lg:max-w-6xl z-10">
        {/* Description */}
        <p className="font-poppins flex lg:hidden text-sm lg:text-base font-light py-4 text-center w-full lg:w-3/5 leading-6">
          {aboutData.description}
        </p>
        <p className="font-poppins hidden lg:flex text-sm lg:text-sm md:px-6 py-4 text-center font-regular w-full md:w-3/5 leading-6">
          {aboutData.description}
        </p>

        {/* Stats Section */}
        <div ref={statsRef} className="flex flex-row justify-between items-center w-full mt-4">
          <div className="lg:text-center w-[50%] lg:w-1/5 md:mb-0">
            <h3 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-[#483d73] to-red-700 to-90% bg-clip-text text-transparent">
              {animatedMachinesSold}
              {machinesSoldComplete && '+'}
            </h3>
            <p className="text-sm lg:text-base font-regular font-poppins">{aboutData.leftstats}</p>
          </div>
          <div className="lg:text-center flex flex-col justify-end w-[50%] lg:w-1/5 md:mt-0">
            <h3 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-[#483d73] to-red-700 to-90% bg-clip-text text-transparent">
              {animatedReadyStockMachines}
              {readyStockMachinesComplete && '+'}
            </h3>
            <p className="lg:text-base font-regular text-sm font-poppins">{aboutData.rightstats}</p>
          </div>
        </div>

        <Link
          href={`/${countryCode}/${languageCode}/about`}
          className="bg-gradient-to-r from-[#483d73] to-red-700 to-90% bg-clip-text text-transparent text-center font-poppins text-base hover:font-semibold mt-4"
        >
          {aboutData.readmore}
        </Link>
      </div>

      {/* Card Carousel */}
      <div className="w-full mt-8">
        {/* Desktop view */}
        <div className="hidden md:flex flex-row w-full items-end gap-4">
          {aboutData.cards.map((card, index) => (
            <CardLink key={index} card={card} index={index} countryCode={countryCode} languageCode={languageCode} />
          ))}
        </div>

        {/* Mobile view with Embla Carousel */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {aboutData.cards.map((card, index) => (
              <div key={index} className="flex-[0_0_80%] mr-4 last:mr-0">
                <CardLink card={card} index={index} countryCode={countryCode} languageCode={languageCode} isMobile />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CardLinkProps {
  card: {
    image: string;
    title: string;
    link: string;
  };
  index: number;
  countryCode: string;
  languageCode: string;
  isMobile?: boolean;
}

const CardLink: React.FC<CardLinkProps> = ({ card, index, countryCode, languageCode, isMobile = false }) => (
  <Link
    className={`relative group flex flex-col items-center ${
      !isMobile && index === 1 ? 'z-10 lg:w-[40%]' : isMobile ? '' : 'lg:w-1/3'
    }`}
    href={`/${countryCode}/${languageCode}/about/${card.link}`}
  >
    <div className="w-full">
      <div
        className={`relative overflow-hidden rounded-md transition-transform transform group-hover:scale-95 ${
          !isMobile && index === 1 ? 'h-58' : isMobile ? 'h-40' : 'h-52'
        }`}
      >
        <BlurImage
          src={card.image}
          alt={card.title}
          width={isMobile ? 300 : 600}
          height={isMobile ? 160 : 250}
          className={`w-full rounded-2xl border-2 object-cover ${
            !isMobile && index === 1 ? 'h-[15rem] lg:w-full w-full md:w-full' : isMobile ? 'h-full' : 'h-52'
          }`}
        />
        <div className="absolute bottom-0 left-0 p-4 flex justify-between items-end w-full">
          <div className={styles.container}>
            <div className={styles.box}>
              <div className={styles.title}>
                <span className={styles.block}></span>
                <AnimatedText text={card.title} />
              </div>
            </div>
          </div>
          <svg
            className={`${
              isMobile ? 'h-8 w-8' : 'h-10 w-10'
            } bg-white p-1.5 rounded-full text-black group-hover:text-white transform transition-transform duration-300 ease-in-out group-hover:rotate-45 group-hover:bg-[#483d73]`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </Link>
);

export default AboutUs;

