import React from "react";
import Arrow from "../../../public/assets/product/Arrow.png";
import BlurImage from "../ui/BlurImage";
import LinkUrl from "../LinkUrl"

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const BreadcrumbProduct: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex flex-wrap" aria-label="Breadcrumb">
      <ol className="inline-flex flex-wrap items-center font-poppins space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items?.map((item, index) => (
          <li key={index} className="inline-flex items-center mb-2">
            {item?.href ? (
              <LinkUrl
                href={item?.href}
                className={`inline-flex items-center text-sm md:text-lg font-bold ${
                  item?.current
                    ? "text-gray-500"
                    : "text-gray-700 hover:text-[#b01e23] dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {index === 0 ? (
                  <>{item?.label}</>
                ) : (
                  <>
                    <BlurImage
                      src={Arrow}
                      height={24}
                      width={24}
                      alt="Arrow"
                      className="h-4 w-4 md:h-6 md:w-6 mr-1 md:mr-2 flex-shrink-0"
                    />
                    <span className="break-all">{item?.label}</span>
                  </>
                )}
              </LinkUrl>
            ) : (
              <span
                className={`inline-flex items-center font-poppins font-medium text-sm md:text-lg ${
                  item?.current ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {index !== 0 && (
                  <BlurImage
                    src={Arrow}
                    height={24}
                    width={24}
                    alt="Arrow"
                    className="h-4 w-4 md:h-6 md:w-6 mr-1 md:mr-2 flex-shrink-0"
                  />
                )}
                <span className="break-all">{item?.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbProduct;

