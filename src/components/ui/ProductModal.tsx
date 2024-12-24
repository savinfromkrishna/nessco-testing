import Link from "next/link";
import BlurImage from "./BlurImage";
import Breadcrumb from "./Breadcrumb";
import { Button } from "./button";
import { countryCODE, languageCODE } from "../Navbar/nav-menue";

interface ProductModalProps {
  image: string;
  title: string;
  description: string;
  buttons: { text: string; icon: boolean }[];
  items: { className: string; text: string }[];
  firstname: string;
  secondname: string;
}

const ProductModal: React.FC<ProductModalProps> = ({
  image,
  title,
  description,
  buttons,
  items,
  firstname,
  secondname,
}) => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: title, current: true }, // Use the title prop for the dynamic breadcrumb item
  ];

  return (
    <>
      <div className="bg-[#F5F5F7] z-[99999] dark:bg-neutral-800 p-8 font-poppins font-regular md:p-14 h-80 rounded-3xl mb-4">
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-[78rem] h-[90vh] bg-white rounded-xl p-6 transform transition-transform overflow-y-auto z-50">
            <Breadcrumb items={breadcrumbItems} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="flex flex-col items-center">
                <Link
                  className=""
                  href={`/${countryCODE}/${languageCODE}/product`}
                >
                  <BlurImage
                    src={image}
                    alt={title}
                    width={600}
                    height={400}
                    className="rounded-2xl object-fill lg:object-contain h-[350px]"
                  />
                </Link>
                <div className="flex w-[60%] lg:-ml-14 space-x-2 lg:space-x-8 justify-center mt-8">
                  {buttons.map((button, index) => (
                    <Link
                      key={index}
                      className="ml-1"
                      href={`/${countryCODE}/${languageCODE}/product`}
                    >
                      <Button
                        className="rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-white hover:text-primary border-2 border-primary px-6 py-2 text-base font-medium transition-all duration-300 ease-in-out group"
                        aria-label="View all items"
                      >
                        <span className="mr-2">View All</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transform transition-transform duration-300 ease-in-out -rotate-45 group-hover:rotate-0 group-hover:translate-x-1"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl lg:text-3xl font-semibold lg:font-bold mb-4">
                  <span className="text-red-600">{firstname}</span>
                  <span className="text-[#483d78] ml-2">{secondname}</span>
                </h2>
                <p className="text-gray-700 text-sm font-regular mb-4">
                  {description}
                </p>
                <ul className="list-none grid grid-cols-2 gap-4 text-gray-700">
                  {items?.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-sm font-regular">{item?.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductModal;
