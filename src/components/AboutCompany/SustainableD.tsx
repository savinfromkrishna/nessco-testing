import BlurImage from "../ui/BlurImage";
import styles from '../AboutCompany/about.module.css';
import style  from './Sustainable.module.css'
import { OurCompanyItem } from "./types/constant";
import React from 'react';
import LinkUrl from "../LinkUrl";

interface AboutLayoutProps{
  companyData:OurCompanyItem;
}
const SustainableD:React.FC<AboutLayoutProps>= ({companyData}) => {
  const homecompanyData=companyData?.Ourcompany[0]?.sustainableContent;


  return (
    <>
      <div className="relative h-full bg-black  overflow-hidden w-full justify-center">
       
        <div className={`${style?.imagecontainer} ` }>
        <div className="absolute w-full h-full ">
          <BlurImage 
            src={homecompanyData?.image}
            alt="Background Image"
            width={400}
            height={400}
            className=' object-cover h-full  w-full'     />
          {/* <div className="absolute inset-0 bg-black opacity-85"></div> */}
          <div className={`${style?.gradientoverlay}`}>
            <div className={`${style?.gradientleft}`}></div>
            <div className={`${style?.gradientright}`}></div>
          </div>
        </div>
        </div>
       

        <div className="relative  flex flex-col items-center justify-center text-center text-white lg:min-h-screen lg:top-0 top-5">
          <h2 className="lg:text-4xl text-2xl font-poppins font-medium">
            {homecompanyData?.heading} <span className="text-green-500">{homecompanyData?.highlight}</span>
          </h2>
          <p className="mt-10 text-sm font-poppins font-regular px-4 md:px-32 text-center">
            {homecompanyData?.description}
          </p>
          <LinkUrl href="/about/sustainability">
          <div className={`${styles?.container}`}>
            <button aria-label='view button' className={styles?.button}>
              {homecompanyData?.buttonText}
              {/* <SlArrowRight className={styles.icon} />  */}
            </button>
          </div>
          </LinkUrl>
        </div>
      </div>
    </>
  );
}

export default SustainableD;
