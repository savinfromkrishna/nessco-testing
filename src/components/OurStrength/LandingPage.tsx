import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OurStrengthItem} from "./types/constant";
import dynamic from 'next/dynamic'
const ReusableForm = dynamic(() => import("../Contact/ReuseableForm"), {
ssr: false,});

import BlurImage from "../ui/BlurImage";
gsap.registerPlugin(ScrollTrigger);

interface MainLayoutProps{
  strengthData:OurStrengthItem;
}

const imageWidths = [
  "lg:w-[3rem] w-[2rem]",
  "lg:w-[3rem] w-[2rem]",
  "lg:w-[10rem] w-[6rem]",
  "lg:w-[3rem] w-[2rem]",
  "lg:w-[3rem] w-[2rem]",
];
const imagebottoms = [
  "justify-end mb-0",
  "justify-end mb-0",
  "justify-start",
  "justify-end mb-0",
  "justify-end mb-0",
];


const Home:React.FC <MainLayoutProps>= ({strengthData}) => {
 const title=strengthData?.OurStrength[1]?.Data?.title
 const description=strengthData?.OurStrength[1]?.Data?.description
 const getaQuote=strengthData?.OurStrength[1]?.Data?.getaQuote
 const image=strengthData?.OurStrength[1]?.Data?.image;
 

  console.log("strengthdata",strengthData);
  console.log("data");
  console.log('Running custom Webpack config');

  return (
    <>
      <div className="mb-14  lg:mt-0 mt-14 w-full font-poppins font-regular overflow-hidden">
     
        <div className="w-full lg:h-screen h-[40rem] relative flex items-center justify-center">
          <video
            id="background-video"
            className="w-full h-screen object-cover object-[center_10%]"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster ={strengthData?.OurStrength[1]?.Data?.video}
          >
            <source src={strengthData?.OurStrength[1]?.Data?.video} type="video/mp4" />
          </video>
          <div className="absolute top-0 h-full w-full bg-black opacity-50"></div>
          <div className="absolute lg:top-28 top-12 space-y-4 flex flex-col  items-center w-full">
            <h1 className="text-white font-semibold lg:text-3xl text-3xl">
             {title}
            </h1>
            <p className="font-normal lg:w-[50%] w-[85%]  text-center lg:text-[0.8rem] text-[0.7rem] text-white">
              {description}
            </p>
          </div>
          <button className="bg-white w-[9.5rem] h-[2.5rem] rounded-full flex items-center absolute bottom-40 lg:hidden">
            {/* <p className="text-black text-[0.8rem] text-center w-full">
             {getaQuote}
            </p>
            <div className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-5 h-5"
            >
              <circle cx="32" cy="32" r="32" className="fill-[#483d73]" />
              <path
                d="M25 20l12 12-12 12"
                className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round"
              />
            </svg>
            </div> */}
            <ReusableForm
            formId="aboutPage"
            buttonText={getaQuote}
            dialogTitle="Get in Touch"
            dialogSubtitle="We'd love to hear from you!"
            imageUrl="https://www.nesscoindia.com/Assets/images/resource/popup.webp"
            showButton={true}
            secodaryButton={false}
            normalButton={true}
          />
          </button>
          <div className="absolute bottom-10 flex justify-center w-full lg:space-x-3 space-x-1 ">
         
            {image.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${imagebottoms[index]}`}
              >
                 <BlurImage
                  src={item?.img}
                  alt="Content"
                  width={100}
                  height={100}
                  className={`${imageWidths[index]}`}
                />
                <p className="font-medium lg:text-sm text-[0.5rem] whitespace-normal text-white w-[4rem] lg:w-[6rem] text-center">
                  {item?.title}
                </p>
              </div>
            ))}
          
          </div>
        </div>
      </div>
    </>
  );
};


export default Home;
