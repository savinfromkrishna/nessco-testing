"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "@/app/[country]/[locale]/context/FormContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SubmitButton from "./Submit";
import FormFields, { FormValues } from "./FormFileds";
import BlurImage from "../ui/BlurImage";

interface ReusableFormProps {
  formId: string;
  buttonText?: string;
  dialogTitle?: string;
  dialogSubtitle?: string;
  imageUrl?: string;
  showButton?: boolean;
  secodaryButton?: boolean;
  normalButton?: boolean;
  learnMore?: boolean;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  formId,
  buttonText = "Enquire",
  dialogTitle = "Get in Touch",
  dialogSubtitle = "We'd love to hear from you!",
  imageUrl,
  showButton = true,
  secodaryButton = false,
  normalButton = false,
  learnMore = false,
}) => {
  const { submitForm } = useForm();
  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    email: "",
    mobilenumber: "",
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<FormValues> = {};
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,14}$/;

    if (!nameRegex.test(formValues.fullname)) {
      newErrors.fullname = "Invalid name";
    }
    if (!emailRegex.test(formValues.email)) {
      newErrors.email = "Invalid email";
    }
    if (!phoneRegex.test(formValues.mobilenumber)) {
      newErrors.mobilenumber = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await submitForm({ ...formValues, formId });
      toast.success("Form submitted successfully!", {
        duration: 3000,
        position: "top-right",
      });
      setFormValues({ fullname: "", email: "", mobilenumber: "" });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to submit the form:", error);
      toast.error("Error submitting the form. Please try again.", {
        duration: 3000,
        position: "top-right",
        style: { borderRadius: "10px", background: "#e63946", color: "#fff" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <>
      <div className="font-poppins mb-[1rem]">
        <h3 className="text-[1.3rem] font-semibold text-[#483d73]">
          {dialogTitle}
        </h3>
        <p className="text-[#727272] text-[0.9rem]">{dialogSubtitle}</p>
      </div>
      <div className="font-poppins space-y-4">
        <FormFields
          onChange={setFormValues}
          values={formValues}
          errors={errors}
        />
        <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} />
      </div>
    </>
  );

  if (!showButton) {
    return formContent;
  }

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="relative">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {secodaryButton ? (
            <Button
              onClick={handleButtonClick}
              className="rounded-full flex items-center justify-between text-primary-foreground border-2 border-white h-[3.5rem] w-40 sm:h-16 sm:w-60 md:h-16 md:w-60 lg:h-16 lg:w-60 text-xs sm:text-sm md:text-base lg:text-lg bg-clip-border relative group custom-gradient-border transition-all duration-300 overflow-hidden"
            >
              <span className="font-medium text-white group-hover:bg-gradient-to-r group-hover:from-[#483d73] group-hover:to-red-700 group-hover:text-transparent group-hover:bg-clip-text pl-2 sm:pl-4 md:pl-6 lg:pl-8 truncate flex-grow text-left transition-all duration-300">
                {buttonText}
              </span>
              <span className="h-8 w-8 sm:h-10 sm:w-10 group custom-gradient-border-icon border-[0.5px] md:h-12 md:w-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#483d73] group-hover:to-red-700 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-16 scale-150 md:h-16 stroke-[#483d73] group-hover:stroke-white transition-all duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Button>
          ) : normalButton ? (
            <Button
              onClick={handleButtonClick}
              className="bg-white text-black font-medium font-poppins py-2 px-6 rounded-full shadow-lg"
            >
              <span className="text-black">{buttonText}</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="w-5 h-5"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="32"
                  className="fill-[#483d73] ml-2"
                />
                <path
                  d="M25 20l12 12-12 12"
                  className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round"
                />
              </svg>
            </Button>
          ) : learnMore ? (
            <>
              <button
                onClick={handleButtonClick}
                className="learn-more mt-2 lg:block hidden"
              >
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text font-poppins">Discover More</span>
              </button>
              <button
                onClick={handleButtonClick}
                className="bg-[#483d73] rounded-full text-white flex items-center justify-center lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="w-5 h-5 ml-2"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="32"
                    className="fill-[#fff] cursor-pointer"
                  />
                  <path
                    d="M25 20 L37 32 L25 44"
                    className="stroke-[#483d73] stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
                  />
                </svg>
                <span className="py-1 px-4 font-poppins">Discover More</span>
              </button>
            </>
          ) : (
            <Button
              onClick={handleButtonClick}
              className="bg-gradient-to-r from-[#483d73] to-red-700 text-white font-medium font-poppins py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
                {buttonText}
              </span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="md:w-[800px] sm:max-w-[800px] p-0 overflow-hidden rounded-[0.5rem]">
          <div className="flex flex-col sm:flex-row bg-white">
            {imageUrl && (
              <div className="w-full lg:flex hidden sm:w-1/2 relative h-[200px] sm:h-auto overflow-hidden">
                <BlurImage
                  src={imageUrl}
                  alt="Decorative image"
                  layout="fill"
                  className="rounded-t-[0.5rem] object-contain p-2 sm:rounded-l-[0.5rem] sm:rounded-tr-none transform hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            )}
            <div
              className={`w-full ${
                imageUrl ? "sm:w-1/2" : ""
              } px-[1.5rem] py-[1rem] bg-white rounded-[0.5rem]`}
            >
              {formContent}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReusableForm;
