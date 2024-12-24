"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuProvider } from "./context/MenuContext";

export let countryCODE = "in";
export let languageCODE = "en";

export const Menu = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState<string | null>(null);
  const [position, setPosition] = useState({ left: 500, width: 0, opacity: 0 });

  // const handleMouseLeave = () => {
  //   setActive(null);
  //   setPosition({ left: 400, width: 0, opacity: 0 });
  // };

  return (
    <MenuProvider>
      <nav
        onMouseLeave={() => {
          setActive(null);
          setPosition({ left: 400, width: 0, opacity: 0 });
        }}
        className="mx-auto px-4 flex w-fit rounded-full border-1"
      >
        {React?.Children?.map(children, (child) =>
          React?.cloneElement(child as React.ReactElement, {
            setActive,
            active,
            setPosition,
          })
        )}
        <Cursor position={position} />
      </nav>
    </MenuProvider>
  );
};

const MenuItem = ({
  setActive,
  active,
  item,
  link,
  setPosition,
  children,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  link?: string;
  setPosition: (position: {
    left: number;
    width: number;
    opacity: number;
  }) => void;
  children?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseEnter = () => {
      if (!ref?.current) return;

      const { width } = ref.current.getBoundingClientRect();

      setPosition({
        left: ref.current.offsetLeft,
        width,
        opacity: 1,
      });

      setActive(item);
    };

    const element = ref.current;
    element.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [ref, setActive, setPosition, item]);

  const pathname = usePathname() || "";
  const pathSegments = pathname?.split("/") || [];
  const countryCode = pathSegments[1] || "in";
  const languageCode = pathSegments[2] || "en";
  countryCODE = countryCode;
  languageCODE = languageCode;

  const handleBlurAreaMouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(null);
  };

  return (
    <div ref={ref} className="z-[9999] cursor-pointer px-3 font-poppins">
      <Link
        className="invert-0 text-base font-light"
        href={`/${countryCode}/${languageCode}/${link}`}
        onClick={() => setActive(null)}
      >
        {item}
      </Link>
      {active === item && item.toLowerCase() !== "contact" && (
        <motion.div className="absolute top-[calc(100%_-_1.0rem)] left-0 pt-4">
          <motion.div
            transition={{ duration: 0.3 }}
            layoutId="active"
            className="bg-white text-black h-screen inset-0 bg-white/40 backdrop-blur-md z-10 overflow-hidden"
          >
            <motion.div
              layout
              className="w-screen shadow-xl z-[99999] mx-auto bg-white h-auto px-12"
            >
              {React.Children.map(children, (child) =>
                React.cloneElement(child as React.ReactElement, { setActive })
              )}
            </motion.div>
            <div
              className="absolute inset-0 z-[-1]"
              onMouseEnter={handleBlurAreaMouseEnter}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  return (
    <motion.div
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 50,
      }}
      className="bg-[#eaeaea] absolute z-0 h-6 rounded-full md:h-6"
    />
  );
};

export default MenuItem;
