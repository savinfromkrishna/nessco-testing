import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import styles from "../Styles/FeatureSlider.module.css";
import BlurImage from "@/components/ui/BlurImage";

const items = [
  {
    imageSrc:
      "https://i.pinimg.com/236x/0c/e0/b8/0ce0b89fedfee2c35378bb573500be31.jpg", // Replace with your image path
    title: "Flat Bottom - Rectangular Bowl Machine Launched",
    description:
      "Like a paper cup, a sustainable relationship balances strength and flexibility, built to weather life's challenges without losing its shape.",
  },
  {
    imageSrc:
      "https://i.pinimg.com/236x/0c/e0/b8/0ce0b89fedfee2c35378bb573500be31.jpg", // Replace with your image path
    title: "Advanced Paper Cup Machine Unveiled",
    description:
      "Introducing the next generation of paper cup machines, designed for precision, speed, and eco-friendly production.",
  },
  {
    imageSrc:
      "https://i.pinimg.com/236x/0c/e0/b8/0ce0b89fedfee2c35378bb573500be31.jpg", // Replace with your image path
    title: "High-Speed Cup Forming Machine Released",
    description:
      "Experience unmatched efficiency with our latest high-speed cup forming machine, engineered for maximum output with minimal waste.",
  },
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const FeatureSlider: React.FC = () => {
  const [itemIndex, setItemIndex] = useState<number>(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setItemIndex((pv) => (pv === items?.length - 1 ? 0 : pv + 1));
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX]);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && itemIndex < items?.length - 1) {
      setItemIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && itemIndex > 0) {
      setItemIndex((pv) => pv - 1);
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${itemIndex * 100}%` }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex  cursor-grab items-center active:cursor-grabbing"
      >
        {items?.map((item, idx) => (
          <motion.div
            key={idx}
            animate={{ scale: itemIndex === idx ? 0.95 : 0.85 }}
            transition={SPRING_OPTIONS}
            className={`${styles?.card} bg-gradient-to-t from-black to-transparent`}
          >
            <BlurImage
              height={100}
              width={100}
              src={item?.imageSrc}
              alt={item?.title}
              className="object-cover w-52 h-32 bg-white lg:mr-4 rounded-lg "
            />
            <div className="flex flex-col py-16 lg:py-0">
              <h3
                className={`${styles?.title} text-sm font-semibold lg:text-lg`}
              >
                {item?.title}
              </h3>
              <p className="text-base font-regular text-gray-500 lg:mt-2">
                {item?.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Dots itemIndex={itemIndex} setItemIndex={setItemIndex} />
    </div>
  );
};

type DotsProps = {
  itemIndex: number;
  setItemIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Dots: React.FC<DotsProps> = ({ itemIndex, setItemIndex }) => {
  return (
    <div className={styles?.indicators}>
      {items?.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setItemIndex(idx)}
          className={`${styles?.indicator} ${
            idx === itemIndex ? styles?.activeIndicator : ""
          }`}
        >
          <span
            className={`${styles?.progress} ${
              idx === itemIndex ? styles?.activeProgress : ""
            }`}
          ></span>
        </button>
      ))}
    </div>
  );
};
