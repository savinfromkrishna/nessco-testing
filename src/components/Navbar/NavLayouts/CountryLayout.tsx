"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition, useEffect, useRef } from "react";
import { locales, LnaguageSwitcherlocales } from "@/i18n";
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const getFullLanguageName = (code: string) => {
  const fullName = LnaguageSwitcherlocales.find((loc) =>
    loc.startsWith(code + "-")
  );
  return fullName ? fullName.split("-")[1] : code.toUpperCase();
};

export default function LocaleSwitcher({
  type = "default",
}: {
  type?: "default" | "footer";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [languageCode, setLanguageCode] = useState("");
  const [visibleCount, setVisibleCount] = useState(16);

  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCodesFromURL = () => {
      const pathSegments = pathname.split("/").filter(Boolean);
      if (pathSegments.length >= 2) {
        setCountryCode(pathSegments[0].toLowerCase());
        setLanguageCode(pathSegments[1].toLowerCase());
      }
    };

    updateCodesFromURL();

    window.addEventListener("popstate", updateCodesFromURL);

    return () => {
      window.removeEventListener("popstate", updateCodesFromURL);
    };
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      const pathSegments = pathname.split("/").filter(Boolean);
      pathSegments[1] = nextLocale;
      const newUrl = `/${pathSegments.join("/")}`;
      router.replace(newUrl);
      setLanguageCode(nextLocale);
    });

    setIsOpen(false);
  };

  const filteredLocales = locales.filter((loc) =>
    getFullLanguageName(loc).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  return (
    <div
      ref={switcherRef}
      className={`relative inline-block text-left z-10 ${
        type === "footer" ? "footer-switcher" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <Button
          type="button"
          className={`inline-flex w-full rounded-full border text-sm font-medium invert-0 focus:outline-none ${
            type === "footer" ? "footer-dropdown" : ""
          } ${isPending ? "opacity-50" : ""}`}
          disabled={isPending}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <div className="h-[1.25rem] w-[1.25rem] flex items-center rounded-full justify-center overflow-hidden">
            <Image
              width={100}
              height={100}
              src={`https://flagcdn.com/${countryCode}.svg`}
              alt={`${countryCode} flag`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex ml-2 font-light flex-col space-y-0">
            <p className="font-poppins invert-0 hidden lg:flex text-16 m-0 p-0 leading-tight">
              {languageCode?.toUpperCase()}
            </p>
            <span className="flex font-poppins lg:hidden invert-0 text-xs m-0 p-0 leading-tight">
              {getFullLanguageName(languageCode)}
            </span>
          </div>
        </Button>
      </div>

      {isOpen && (
        <div
          className={`absolute ${
            type === "footer"
              ? "bottom-full mb-2"
              : "top-full mt-2 right-[-6.5rem]"
          }  w-72 bg-white rounded-2xl shadow-lg border border-gray-300 ring-1 ring-black ring-opacity-5`}
        >
          <div className="relative p-4">
            <input
              type="text"
              className="w-full font-poppins text-14 px-2 py-1 pl-2 border rounded-full focus:outline-none focus:ring"
              placeholder="search your langague"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="max-h-60 grid grid-cols-2 overflow-y-auto scrollbar-custom">
            {filteredLocales?.slice(0, visibleCount).map((loc) => (
              <button
                key={loc}
                className="w-full text-left px-4 py-0 text-sm invert-0 flex items-center"
                onClick={() => onSelectChange(loc)}
              >
                <p className="px-1 w-24 hover:bg-gray-200 hover:rounded-3xl">
                  {getFullLanguageName(loc)}
                </p>
              </button>
            ))}
            {visibleCount < filteredLocales?.length && (
              <p
                className="text-[#dc0e2a] cursor-pointer pl-4 p-2"
                onClick={handleShowMore}
              >
                more
              </p>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        .footer-switcher .absolute {
          bottom: 100%;
          top: auto;
          margin-bottom: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
