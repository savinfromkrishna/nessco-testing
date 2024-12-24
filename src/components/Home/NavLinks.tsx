"use client";

import React, { memo, useCallback, useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface NavLinkProps {
  text: string;
  index: number;
  activeLink: number;
  handleClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = memo(
  ({ text, index, activeLink, handleClick }) => (
    <div
      className={`text-black cursor-pointer text-base font-light flex flex-row py-1 transition-all duration-300 ${
        activeLink === index ? "border-b-2 border-red-700 text-red-700" : ""
      }`}
      onClick={handleClick}
    >
      {text}
    </div>
  )
);

NavLink.displayName = "NavLink";

interface NavLinksDemoProps {
  type?: string;
  navItems: { text: string; ref: React.RefObject<HTMLDivElement> }[];
}

const NavLinksDemo: React.FC<NavLinksDemoProps> = ({ type, navItems }) => {
  const [activeLink, setActiveLink] = useState<number>(-1);
  const [scrolling, setScrolling] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleClick = useCallback(
    (index: number, ref: React.RefObject<HTMLDivElement>) => () => {
      setActiveLink(index);
      const yOffset = -120; // Increased offset for better positioning
      const element = ref.current;

      if (element) {
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    []
  );

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = navItems.findIndex(
            (item) => item.ref.current === entry.target
          );
          if (index !== -1) {
            setActiveLink(index);
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -10% 0px",
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
      observer.disconnect();
    };
  }, [navItems]);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navTop = navRef.current.getBoundingClientRect().top;
        setScrolling(navTop <= 56);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (
      activeLink !== -1 &&
      mobileNavRef.current &&
      navItemRefs.current[activeLink]
    ) {
      const container = mobileNavRef.current;
      const activeItem = navItemRefs.current[activeLink];
      if (activeItem) {
        const containerRect = container.getBoundingClientRect();
        const activeItemRect = activeItem.getBoundingClientRect();

        const isItemVisible =
          activeItemRect.left >= containerRect.left &&
          activeItemRect.right <= containerRect.right;
        if (!isItemVisible) {
          const scrollLeft =
            activeItemRect.left -
            containerRect.left -
            (containerRect.width - activeItemRect.width) / 2;
          container.scrollTo({
            left: container.scrollLeft + scrollLeft,
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeLink]);
  return (
    <div
      ref={navRef}
      className={`sticky lg:mt-0 mt-10 top-[3.3rem] z-40 transition-all duration-300 ${
        scrolling
          ? "bg-gray-50 shadow-md"
          : type === "product"
          ? "bg-white border-none"
          : "bg-[#f2f2f2] border-none"
      }`}
    >
      {/* Mobile Navigation */}
      <div
        ref={mobileNavRef}
        className="md:hidden overflow-x-auto z-50 scrollbar-hide pl-4"
      >
        <nav className="w-full flex items-center h-14">
          <ul className="flex items-center">
            {navItems.map((item, index) => (
              <li
                key={index}
                ref={(el) => {
                  navItemRefs.current[index] = el;
                }}
              >
                <Button
                  className={`flex mr-4 items-center z-[9999] justify-center w-auto h-auto px-2 py-[0.15rem] rounded-full text-sm font-medium transition-all duration-300 ${
                    activeLink === index
                      ? "bg-red-700 text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                  onClick={handleClick(index, item.ref)}
                >
                  {item.text}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Desktop Navigation */}
      <nav
        className={`hidden ${
          scrolling ? "border-t-2 border-gray-200" : "border-none"
        } md:flex flex-row flex-wrap text-base z-[99] lg:h-10 font-light font-poppins px-12 lg:mt-0 sticky space-x-2 sm:space-x-6 text-black`}
      >
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            text={item.text}
            index={index}
            activeLink={activeLink}
            handleClick={handleClick(index, item.ref)}
          />
        ))}
      </nav>
    </div>
  );
};

export default NavLinksDemo;
