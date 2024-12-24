import { useMemo } from "react";
import { Variants } from "framer-motion";

export const useProductAnimations = () => {
  const imageVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.05,  // Reduced delay for faster sequence
          duration: 0.2,    // Reduced duration for quicker animation
          ease: "easeInOut",
        },
      }),
    }),
    []
  );

  const sidebarVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -30 },
      visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: i * 0.1,  // Sequential delay for sidebar links
          duration: 0.4,   // Duration for sidebar link animation
          ease: "easeOut",
        },
      }),
    }),
    []
  );

  return { imageVariants, sidebarVariants };
};
