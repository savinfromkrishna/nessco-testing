import { useState, useEffect } from "react";
import styles from "../Styles/FeatureCaraousel.module.css";
import dynamic from 'next/dynamic'
const BlurImage=dynamic(()=>import("@/components/ui/BlurImage"))
interface FeatureCaraouselProps {
  type?: string;
}

const FeatureCaraousel = ({ type }: FeatureCaraouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      id: 1,
      heading: "Flat Bottom - Rectangular Bowl Machine Launched",
      title:
        "Like a paper cup, a sustainable relationship balances strength and flexibility, built to weather life's challenges without losing its shape.",
      icon: "https://i.pinimg.com/564x/a1/0b/2b/a10b2b0d6b8d33d066a71115be3e6d41.jpg",
    },
    {
      id: 2,
      heading: "Flat Bottom - Rectangular Bowl Machine Launched",
      title:
        "Crafted in harmony with Jaipur's heritage, Nesco's paper cup machines symbolize modern efficiency integrated with the timeless allure of the Pink City.",
      icon: "https://i.pinimg.com/236x/01/24/73/01247305bd1f1dd27f1b24cdf78ac61a.jpg",
    },
    {
      id: 3,
      heading: "Flat Bottom - Rectangular Bowl Machine Launched",
      title:
        "Nessco's paper cup machines leave a global footprint, catering to sustainable packaging needs worldwide with innovative technology.",
      icon: "https://i.pinimg.com/236x/c0/57/85/c05785e40e64dd85c82e0cb7abea551c.jpg",
    },
    {
      id: 4,
      heading: "Flat Bottom - Rectangular Bowl Machine Launched",
      title:
        "From Asia to Europe, Nessco's paper cup machines uphold quality and eco-friendliness, shaping the future of packaging solutions internationally.",
      icon: "https://i.pinimg.com/236x/dc/44/33/dc44331372aa41e8e8d7e042c31a93fe.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items?.length]);

  return (
    <div className={styles?.FeatureCaraousel}>
      {items?.map((item, index) => (
        <div
          key={item?.id}
          className={`${styles?.card} ${
            currentIndex === index ? styles?.active : styles?.notactive
          } ${currentIndex === (index + 1) % items?.length ? styles?.next : ""}`}
        >
          <div className={styles?.icon}>
            <BlurImage
              src={item?.icon}
              className="h-28 w-full py-1 rounded-3xl"
              height={200}
              width={200}
              alt={"image"}
            />
          </div>
          <div className={styles?.content}>
            <div className="pt-0 flex flex-col">
              {type === "newsFeature" && (
                <h2 className="text-xl text-black text-justify font-bold">
                  {item?.heading}
                </h2>
              )}
              <h2 className="font-montserrat bottom-0  text-base leading-5">{item?.title}</h2>
            </div>
          </div>
        </div>
      ))}
      <div className={styles?.indicators}>
        {items?.map((_, index) => (
          <span
            key={index}
            className={`${styles?.indicator} ${
              currentIndex === index ? styles?.active : ""
            }`}
          >
            <span className={styles?.progress}></span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FeatureCaraousel;
