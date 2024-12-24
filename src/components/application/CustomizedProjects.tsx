"use client";
import React, { useEffect, useRef, useState } from "react";
import BlurImage from "../ui/BlurImage";
import { ApplicationItem } from "./types/constant";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product } from "./Pages";

gsap.registerPlugin(ScrollTrigger);

interface Page3Props {
  selectedProduct: Product;
}

interface ApplicationProps {
  applicationData: ApplicationItem;
}

type CombinedProps = ApplicationProps & Page3Props;

const Page4: React.FC<CombinedProps> = ({ applicationData, selectedProduct }) => {
  const CustomizedProjects = applicationData?.Application[0]?.CustomizedProjects;
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const borderRef = useRef<HTMLDivElement | null>(null);
  const borderImgRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const title2Refs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop] = useState<boolean>(true);

  const toggleReadMore = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text?.split(" ");
    return words?.length > wordLimit
      ? words?.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const wordLimit = isDesktop ? 80 : 20;

  const displayedParagraph = isExpanded
    ? CustomizedProjects?.seoDescription
    : truncateText(CustomizedProjects?.seoDescription, wordLimit);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    img: string;
    title2: string;
  } | null>(null);

  const openModal = (img: string, title2: string) => {
    setSelectedImage({ img, title2 });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log(selectedProduct);
    console.log(applicationData);
  }, [selectedProduct, applicationData]);

  useEffect(() => {
    if (borderRef.current) {
      gsap.fromTo(
        borderRef.current,
        { width: "2%" },
        {
          width: "13%",
          ease: "none",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "-15% 40%",
            end: "0% 50%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    if (borderImgRef.current) {
      gsap.fromTo(
        borderImgRef.current,
        { height: "10%" },
        {
          height: "94.5%",
          ease: "none",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "25% 70%",
            end: "95% 80%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    imageRefs.current.forEach((imageRef, idx) => {
      const title2Ref = title2Refs.current[idx];
      if (imageRef && title2Ref) {
        gsap.set(title2Ref, { opacity: 0, y: 20 }); // Initially hide title2
        gsap.fromTo(
          imageRef,
          { scale: 1 },
          {
            scale: 1.1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: imageRef,
              start: "-10% 70%",
              end: "bottom 80%",
              scrub: true,
              onUpdate: (self) => {
                if (self.progress > 0.5) {
                  gsap.to(title2Ref, { opacity: 1, y: 0, duration: 0.5 });
                } else {
                  gsap.to(title2Ref, { opacity: 0, y: 20, duration: 0.5 });
                }
              },
            },
          }
        );
      }
    });
  }, []);

  const productItems =
    CustomizedProjects.container[0][
      selectedProduct?.title as keyof typeof CustomizedProjects.container[0]
    ] || [];

  return (
    <div className="">
      {Array.isArray(productItems) && productItems.length > 0 && (
        <div
          className="lg:mt-[8rem] mt-[3rem] lg:px-[2rem] px-[1rem] font-regular font-poppins pb-[4rem]"
          ref={carouselRef}
        >
          <div className="lg:px-[1rem] lg:mb-[8rem] mb-[4rem]">
            <h2 className="lg:text-[2.2rem] text-[1.5rem] font-semibold">
              <span className="text-[#483d73]">
                {CustomizedProjects?.craftsmanshipTechnology
                  ?.trim()
                  .replace(/\s+\S+$/, "") || "Default Title"}
              </span>{" "}
              <span className="text-red-700">
                {CustomizedProjects?.craftsmanshipTechnology
                  ?.trim()
                  .match(/\S+$/) || "Default Title"}
              </span>
            </h2>
            <div
              className="border-t-[0.2rem] border-solid border-red-700 w-[8rem] mt-[1rem]"
              ref={borderRef}
            ></div>
            <div className="lg:w-[76vw] w-[98%] lg:mt-[2rem] mt-[1rem]">
              <p className="lg:text-[1rem] text-sm">
                {CustomizedProjects?.paragraph}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="lg:w-[1.7rem] w-[1.2rem] lg:h-[1.7rem] h-[1.2rem] bg-white border-2 border-solid border-red-700 absolute lg:right-[4.8rem] right-[1.5rem] lg:-top-[3rem] -top-[1.5rem] rounded-full"></div>
            <div
              className="border-solid lg:border-r-[0.2rem] border-r-2 border-red-700 absolute lg:-top-[2rem] -top-[1rem] lg:right-[5.5rem] right-[2rem] -z-10"
              ref={borderImgRef}
            ></div>

            {productItems.map((item, idx) => (
              <div key={idx} className="flex lg:my-[3rem] my-[1rem]">
                <div className="lg:w-[65%] w-[60%] lg:pl-[1rem] pl-[0.5rem]">
                  <h2 className="lg:text-[1.6rem] text-[1.1rem] text-[#483d73] font-medium lg:mb-[0.8rem] mb-[0.4rem]">
                    {item?.title1}
                  </h2>
                  <p className="lg:text-[1rem] text-sm">{item?.description}</p>
                </div>
                <div className="lg:w-[35%] w-[40%] flex justify-end items-center">
                  <div className="h-full flex items-end">
                    <h3
                      className="bg-gradient-to-r from-[#483d73] to-red-700 text-white lg:text-[1.1rem] text-[0.5rem] lg:py-[0.2rem] lg:px-[2.5vw] px-[0.5rem] rounded-[2rem]"
                      ref={(el) => {
                        title2Refs.current[idx] = el;
                      }}
                    >
                      {item?.title2}
                    </h3>
                  </div>
                  <div
                    className="lg:w-[11rem] w-[4rem] lg:h-[11rem] h-[4rem] border-2 border-solid border-[#483d73] rounded-full overflow-hidden"
                    onClick={() => openModal(item.img, item.title2)}
                    ref={(el) => {
                      imageRefs.current[idx] = el;
                    }}
                  >
                    <BlurImage
                      className="object-fill h-full w-full"
                      width={300}
                      height={300}
                      src={item?.img}
                      alt={item?.title1}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 mx-4 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-[#483d73]">
              {selectedImage?.title2}
            </h2>
            <div className="relative w-full h-64">
              <BlurImage
                className="object-cover w-full h-full rounded-lg"
                src={selectedImage?.img}
                alt={selectedImage?.title2}
                layout="fill"
              />
            </div>
            <button
              aria-label="Close"
              className="mt-4 py-1 px-2 rounded float-right bg-[#483d73] text-white"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="w-full text-black border-solid border-t-2 border-[#eeeded] bg-white px-[1rem] lg:px-[3rem] z-30 mt-16 pt-[1rem]">
        <p className="text-xs font-thin mt-2">{displayedParagraph}</p>
        <button
          onClick={toggleReadMore}
          aria-label="Read More"
          className="underline italic text-xs hover:text-red-700 hover:not-italic my-[1rem]"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default Page4;
