import { HomeData } from "../Home/types/constant";

interface ImageSliderLayoutProps {
  heroData: HomeData;
}

const ImageSlider: React.FC<ImageSliderLayoutProps> = ({ heroData }) => {
  return (
    <div className="relative w-full mx-auto h-full">
      
        <video
          src={heroData?.home[1]?.data?.video?.sources[0]?.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-2xl"
        >
          Your browser does not support the video tag.
        </video>
        
      
      <div className="absolute  w-auto lg:top-1/3 top-[5rem] left-20 text-white ">
        <h2 className="lg:text-5xl md:text-5xl sm:text-4xl text-3xl font-semibold mb-2">
          {heroData?.home[1]?.data?.textOverlay?.headline}
        </h2>
        <p className="lg:text-4xl md:text-4xl sm:text-3xl text-xl italic">
          {heroData?.home[1]?.data?.textOverlay?.subheadline}
        </p>
      </div>
    </div>
  );
};

export default ImageSlider;
