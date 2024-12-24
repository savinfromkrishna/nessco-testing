"use client";
import React, { memo, useCallback, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavLinkProps {
  text: string;
  index: number;
  activeLink: number;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  handleClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = memo(
  ({
    text,
    index,
    activeLink,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  }) => (
    <Link
      href="#"
      scroll={false}
      className={`text-black text-sm md:ml-[2.5rem] pt-2 hover:font-bold ${
        activeLink === index ? "border-b-2 border-[#3a2a79]" : ""
      }`}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {text}
    </Link>
  )
);

NavLink.displayName = "NavLink";

interface NavLinksDemoProps {
  navItems: { text: string; ref: React.RefObject<HTMLDivElement> }[];
}

const NavLinksDemo: React.FC<NavLinksDemoProps> = ({ navItems }) => {
  const [activeLink, setActiveLink] = useState<number>(-1);
  const [menuExpanded, setMenuExpanded] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setActiveLink(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveLink(-1);
  }, []);

  const handleClick = (ref: React.RefObject<HTMLDivElement>) => () => {
    const yOffset = -100; // Adjust this value to your desired offset
    const element = ref.current;

    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setMenuExpanded(false); // Collapse the menu on any section click
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = navItems.findIndex(
            (item) => item.ref.current === entry.target
          );
          setActiveLink(index);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    navItems.forEach((item) => {
      if (item.ref.current) {
        observer.observe(item.ref.current);
      }
    });

    return () => {
      navItems.forEach((item) => {
        if (item.ref.current) {
          observer.unobserve(item.ref.current);
        }
      });
    };
  }, [navItems]);


  const toggleMenu = () => {
    setMenuExpanded((prev) => !prev);
  };

  return (
    <div
      ref={navRef}
      className={` className="transition-all duration-300 bg-white`}
    >
      <div className="flex justify-between items-center px-2 py-2 md:hidden -mt-[9rem]">
        <button onClick={toggleMenu} className="text-black text-sm font-bold">
          {menuExpanded ? "Overview ▲" : "Overview ▼"}
        </button>
      </div>

      <AnimatePresence>
        {menuExpanded && (
          <motion.div
            initial={{ y: "0", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "0", opacity: 0 }}
            transition={{ duration: 0, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] bg-white rouded-3xl flex flex-col items-start h-[45vh] w-full px-6 py-3 md:hidden"
          >
            <nav className="w-full">
              <button
                onClick={toggleMenu}
                className="text-black text-sm font-bold mb-4"
              >
                Overview ▲
              </button>
              <ul>
                {navItems?.map((item, index) => (
                  <li key={index} className="mb-4">
                    <NavLink
                      text={item?.text}
                      index={index}
                      activeLink={activeLink}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                      handleClick={handleClick(item?.ref)}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="hidden bg-white md:flex left-0 mb-[4rem] mt-0 md:-mt-10 flex-row flex-wrap text-16 font-poppins space-x-2 sm:space-x-6 text-black px-1 sm:px-2">
        {navItems?.map((item, index) => (
          <NavLink
            key={index}
            text={item?.text}
            index={index}
            activeLink={activeLink}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleClick={handleClick(item?.ref)}
          />
        ))}
      </nav>
    </div>
  );
};

export default NavLinksDemo;