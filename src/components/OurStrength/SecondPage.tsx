"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import { OurStrengthItem } from "./types/constant";
import { Timeline } from "./TimeLine";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import BlurImage from "../ui/BlurImage";

interface MainLayoutProps {
  strengthData: OurStrengthItem;
}

const SecondPage: React.FC<MainLayoutProps> = ({ strengthData }) => {
  // const title = strengthData?.OurStrength[2]?.OurStrengthFeature?.strengthItems;
  const component =
    strengthData?.OurStrength[2]?.OurStrengthFeature?.StrengthComponent;

  const [componentData, setComponentData] = useState(null);
  const [swiper, setSwiper] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const openModal = (content) => {
    setComponentData(content);
  };

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  const timelineData = component?.map((item) => ({
    title: item.title1,
    content: (
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="order-first">
            <video
              className="w-full h-full object-cover rounded-xl bg-gray-100"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src={item?.video} type="video/mp4" />
            </video>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="lg:text-2xl text-lg font-normal font-poppins">
              {item?.title1}
            </h3>
            <h3 className="font-poppins font-semibold lg:text-lg text-xs text-[#483d73] mt-2">
              {item?.title2}
            </h3>
            <p className="mt-4 font-poppins lg:text-sm text-xs lg:text-left">
              {item?.description}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="mt-4 text-[#483d73] self-start"
                  onClick={() => openModal(item)}
                >
                  Learn More
                </Button>
              </DialogTrigger>
              <DialogContent className="md:max-w-4xl bg-white">
                <div className="flex flex-col w-full lg:p-4 relative rounded-3xl">
                  <div className="relative flex justify-center items-center">
                    <div className="overflow-hidden lg:w-[30rem] w-[20rem]">
                      <Swiper
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={1.5}
                        loop={true}
                        coverflowEffect={{
                          rotate: 0,
                          stretch: 100,
                          depth: 50,
                          modifier: 2,
                          slideShadows: true,
                        }}
                        modules={[EffectCoverflow, Navigation, Autoplay]}
                        onSwiper={setSwiper}
                        speed={500}
                        spaceBetween={30}
                        autoplay={{
                          delay: 3000,
                          disableOnInteraction: false,
                        }}
                        className="mySwiper"
                      >
                        {componentData?.modalContent?.images?.map(
                          (img, index) => (
                            <SwiperSlide key={index}>
                              <BlurImage
                                src={img.img}
                                width={300}
                                height={300}
                                alt="img"
                              />
                            </SwiperSlide>
                          )
                        )}
                      </Swiper>
                    </div>
                    <div
                      ref={prevRef}
                      className="absolute left-0 cursor-pointer z-10 lg:visible invisible"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        height={30}
                        width={30}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
                            fill="#000000"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div
                      ref={nextRef}
                      className="absolute right-0 cursor-pointer z-10 lg:visible invisible"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        height={30}
                        width={30}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z"
                            fill="#000000"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-[#483d73] font-poppins text-center w-full font-semibold my-4 text-2xl">
                    {componentData?.modalContent?.title}
                  </h3>
                  <p className="font-poppins text-black font-normal text-sm lg:px-10 px-0">
                    {componentData?.modalContent?.description}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div>
      <Timeline data={timelineData} />
    </div>
  );
};

export default SecondPage;
