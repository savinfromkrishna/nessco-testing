import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

type AnimatedContainerProps = {
  children: React.ReactNode;
  currentIndex: number;
};

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  currentIndex,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.05, ease: "easeOut" },
    });
  }, [currentIndex, controls]);

  return (
    <motion.div
      initial={{ y: "100%", scale: 0.5, opacity: 0 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
