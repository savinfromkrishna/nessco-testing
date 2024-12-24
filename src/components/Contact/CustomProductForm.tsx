"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FormProvider,
  useForm,
} from "@/app/[country]/[locale]/context/FormContext";
import SubmitButton from "./Submit";
import { RelatedProductType } from "../Products/types/constant";
import { countryCODE, languageCODE } from "../Navbar/nav-menue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FormFields, { FormValues } from "./FormFileds";
import { z } from "zod";
import BlurImage from "../ui/BlurImage";

interface SignupFormDemoProductProps {
  related_product: RelatedProductType;
  name?: string;
  image?: string;
  mimage?: string;
  product_heading?: string;
  first_name: string;
}

const formSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobilenumber: z.string().min(10, "Invalid phone number"),
});

const SignupFormDemoProduct: React.FC<SignupFormDemoProductProps> = ({
  related_product,
  product_heading,
  mimage,
  image,
  name,
  first_name,
}) => {
  const [expanded] = useState(false);
  const { submitForm } = useForm();

  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    email: "",
    mobilenumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const validateForm = () => {
    const result = formSchema.safeParse(formValues);
    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(". ");
      return errorMessage;
    }
    return null;
  };

  const handleSubmit = async (formId: string) => {
    const validationError = validateForm();
    if (validationError) {
      console.error(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitForm({ ...formValues, formId });
      console.log("Form submitted successfully!");
      setFormValues({ fullname: "", email: "", mobilenumber: "" });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to submit the form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const relatedProducts = related_product?.imageWithDescription || [];
  function formatString(input) {
    return input.toLowerCase().replace(/\s+/g, "-");
  }

  return (
    <FormProvider>
      <motion.div
        className="flex w-full lg:sticky lg:top-[6.4rem] h-full mx-auto justify-center font-poppins"
        animate={{ y: 0, height: "33rem", opacity: 1 }}
      >
        <div className="w-full lg:h-screen h-max gap-2 flex flex-col">
          {/* part-one-contact-page */}
          <div className="border-2 border-[#483d73] relative w-full lg:h-[32.2vh] overflow-hidden z-10 bg-white px-4 py-2 rounded-xl shadow-md before:w-24 before:opacity-40 before:h-24 before:absolute before:bg-gray-500 before:rounded-full before:-z-10 before:blur-3xl after:w-32 after:h-32 after:absolute after:bg-[#483d73] after:opacity-40 after:rounded-full after:-z-10 after:blur-3xl after:top-24 after:-right-12">
            <p className="w-full text-left font-semibold pb-2">
              <span className="text-gray-500">Want to Know More?</span>
              <span className="text-gray-800"> Enquire Now</span>
            </p>

            <FormFields
              onChange={setFormValues}
              values={formValues}
              inline={true}
              errors={{}}
            />

            <div className="w-full flex justify-center mt-2">
              <SubmitButton
                isSubmitting={isSubmitting}
                onClick={() => handleSubmit("SignupFormDemoProduct")}
              />
            </div>
          </div>

          <div className="w-full flex lg:h-[10vh] bg-white rounded-xl p-4 items-center font-poppins shadow-md border-[#483d73] border ">
            <div className="w-[80%] flex flex-col items-start justify-center">
              <h2 className="font-semibold text-gray-700">
                <span className="text-gray-500">Download</span> Brochure
              </h2>
              <p className="text-black font-semibold text-sm">
                <span className="text-gray-800 font-regular">
                  Nessco {product_heading}
                </span>{" "}
                Catalogue
              </p>
            </div>
            <div
              className="w-[20%] h-full font-poppins flex items-center justify-center cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            >
              <svg
                viewBox="-0.4 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M12 12V19M12 19L9.75 16.6667M12 19L14.25 16.6667M6.6 17.8333C4.61178 17.8333 3 16.1917 3 14.1667C3 12.498 4.09438 11.0897 5.59198 10.6457C5.65562 10.6268 5.7 10.5675 5.7 10.5C5.7 7.46243 8.11766 5 11.1 5C14.0823 5 16.5 7.46243 16.5 10.5C16.5 10.5582 16.5536 10.6014 16.6094 10.5887C16.8638 10.5306 17.1284 10.5 17.4 10.5C19.3882 10.5 21 12.1416 21 14.1667C21 16.1917 19.3882 17.8333 17.4 17.8333"
                    stroke="currentColor"
                    className="stroke-[#483d73] w-24 h-24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
          </div>

          <div className="h-[37vh] bg-white p-4 font-regular rounded-xl hidden lg:block shadow-md">
            <h2 className="font-semibold text-gray-800 mb-2">
              <span className="text-gray-500">Related</span> Products
            </h2>

            <div
              id="scrollbar1"
              className={`w-full space-y-2 flex flex-col transition-all duration-300 ease-in-out
               h-[30vh] overflow-auto scrollbar
                  
              `}
            >
              <div className="w-full max-w-md">
                {relatedProducts
                  .slice(0, expanded ? relatedProducts.length : 3)
                  .map((product, index) => (
                    <Link
                      href={`/${countryCODE}/${languageCODE}/products/${formatString(
                        product?.h1
                      )}`}
                      key={index}
                      className="flex border-b-[2px] items-start  hover:bg-gray-50 transition-colors duration-200 p-2 rounded-md"
                    >
                      <div className="w-16 h-16 rounded-md overflow-hidden">
                        <BlurImage
                          src={product?.img}
                          alt={product?.h1}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>

                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-sm">{product?.h1}</h3>
                        <p className="text-xs text-gray-600">
                          {product.information}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* <div className="flex justify-center">
              <Button
                onClick={() => setExpanded(!expanded)}
                variant="ghost"
                size="sm"
                className="-mt-8"
              >
                {expanded ? (
                  <ChevronUp className="h-5 w-5 bg-gray-300 rounded-full" />
                ) : (
                  <ChevronDown className="h-5 w-5 bg-gray-300 rounded-full" />
                )}
              </Button>
            </div> */}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white rounded-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row"
              >
                <div className="w-full sm:w-1/2 bg-gray-50 relative h-[300px] sm:h-auto overflow-hidden ">
                  <div className="absolute  inset-0 flex flex-col justify-between p-4">
                    <div>
                      <h1 className="text-2xl font-bold text-black mb-2">
                        {first_name}
                      </h1>
                      <h2 className="text-xl text-black/80">{name}</h2>
                    </div>
                    <div className="flex items-end">
                      <div className=" p-4 rounded-lg backdrop-blur-sm">
                        <BlurImage
                          src={mimage}
                          alt="Product icon"
                          width={64}
                          height={64}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <BlurImage
                    src={image}
                    alt="Brochure preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl sm:rounded-l-2xl "
                  />
                </div>
                <div className="w-full sm:w-1/2 p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#483d73]">
                      Download Brochure
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                      Fill in your details to receive the Nessco{" "}
                      {product_heading} Catalogue.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit("DownloadBrochure");
                    }}
                    className="space-y-4 mt-4"
                  >
                    <FormFields
                      onChange={setFormValues}
                      values={formValues}
                      inline={false}
                      errors={{}}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-[#483d73] text-white hover:bg-[#2c2447] transition-colors duration-200"
                    >
                      {isSubmitting ? "Submitting..." : "Download Brochure"}
                    </Button>
                  </form>
                </div>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    className="absolute top-2 right-2 rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </Button>
                </DialogClose>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </FormProvider>
  );
};

export { SignupFormDemoProduct };
