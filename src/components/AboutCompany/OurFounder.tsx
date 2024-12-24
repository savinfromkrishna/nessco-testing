"use client";
import BlurImage from "../ui/BlurImage";
import styles from "./about.module.css";
import { OurCompanyItem } from "./types/constant";

interface MainLayoutProps {
  companyData: OurCompanyItem;
}

const FounderCard: React.FC<{
  name: string;
  title: string;
  description: string;
  imageSrc: string;
  linkedInUrl: string;
}> = ({ name, title, description, imageSrc, linkedInUrl }) => (
  <div
    className={`${styles.card} lg:w-[25rem] flex lg:flex-col bg-yellow-200 lg:h-[30rem] w-full h-[12rem] md:h-[20rem]`}
  >
    {/* Image container */}
    <div className="lg:w-full lg:h-[70%] h-full w-[50%] lg:p-4">
      <BlurImage
        className="transform 0.3 ease-in-out lg:rounded-t-xl rounded-xl  h-full w-full  object-cover object-[center_10%]"
        
        
        src={imageSrc}
        alt={name}
        width={400}
        height={400}
      />
    </div>

    {/* Content */}
    <div className="relative justify-center lg:h-[30%] lg:w-full w-[50%] h-full lg:p-4 items-center flex flex-col flex-none lg:items-start pl-3">
      <h3
        className={`${styles?.nameTitle} md:text-xl lg:text-sm font-poppins font-regular text-center lg:pl-0 pl-2  lg:text-left`}
      >
        {name}
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkedinIcon}
        >
          <BlurImage
            src="https://res.cloudinary.com/dlti4o10e/image/upload/v1731577680/linkedin_oynbsy.png"
            alt="LinkedIn"
            width={20}
            height={20}
            className="inline-block ml-3 lg:visible invisible"
          />
        </a>
      </h3>
      <p className="md:text-lg lg:text-sm lg:right-0 text-sm text-center lg:text-left">
        {title}
      </p>
      <p className="lg:invisible visible text-center md:text-lg text-sm">
        The work we do reflect who we are
      </p>

      {/* Hidden box for description */}
      <div
        className={`${styles?.descriptionContainer} lg:visible invisible p-4`}
      >
        <h3 className="font-bold font-montserrat text-lg mt-1">{name}</h3>
        <p className="font-montserrat">{title}</p>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <BlurImage
            src="https://res.cloudinary.com/dlti4o10e/image/upload/v1731577680/linkedin_oynbsy.png"
            alt="LinkedIn"
            width={20}
            height={20}
            className="inline-block mb-3"
          />
        </a>
        <p className="text-black font-poppins text-xs font-regular">{description}</p>
      </div>
    </div>
  </div>
);

const Founders: React.FC<MainLayoutProps> = ({ companyData }) => {
  const data = companyData?.Ourcompany[0];
  const { ourfounderheading, founders } = data || {};

  return (
    <div className="bg-black text-white py-16 h-full ">
      <h2 className="text-center lg:text-3xl text-2xl font-poppins font-medium mb-8 lg:mt-0">
        {ourfounderheading?.title} {" "}
        <span className="text-red-600">{ourfounderheading?.highlight}</span>
      </h2>
      <div className="lg:flex justify-center lg:gap-4 space-y-5 lg:space-y-0 lg:p-10 p-5">
        {founders?.map((founder, index) => (
          <FounderCard key={index} {...founder} />
        ))}
      </div>
    </div>
  );
};

export default Founders;