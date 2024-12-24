import React from "react"
import BlurImage from "../ui/BlurImage";
import Arrow from "../../../public/assets/product/Arrow.png"
import LinkUrl from "../LinkUrl";

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex px-4 sm:px-16 font-poppins" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items?.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {item?.href ? (
              <LinkUrl
                href={item?.href}
                className={`inline-flex items-center text-xs sm:text-lg font-regular ${
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
                      height={800}
                      width={400}
                      alt="Arrow"
                      className="h-6 w-max pr-2"
                    />
                    {item?.label}
                  </>
                )}
              </LinkUrl>
            ) : (
              <span
                className={`inline-flex items-center text-xs sm:text-lg font-regular ${
                  item?.current ? "text-gray-500" : "text-gray-700"
                }`}
              >
                {index !== 0 && (
                  <BlurImage
                    src={Arrow}
                    height={800}
                    width={400}
                    alt="Arrow"
                    className="h-6 w-max pr-2"
                  />
                )}
                {item?.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}