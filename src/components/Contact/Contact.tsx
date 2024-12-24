"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { FormProvider } from "@/app/[country]/[locale]/context/FormContext";
import dynamic from 'next/dynamic'
const ReusableForm = dynamic(() => import("../Contact/ReuseableForm"), {
ssr: false,});

interface EnquiryFormProps {
  formId?: string;
  showButton?: boolean;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({
  formId = "HomePage/Enquire",
  showButton = true,
}) => {
  return (
    <FormProvider>
      <div className="relative">
        <Toaster />
        <ReusableForm
          formId={formId}
          buttonText="Enquire"
          dialogTitle="Get in Touch"
          dialogSubtitle="We'd love to hear from you!"
          imageUrl="https://www.nesscoindia.com/Assets/images/resource/popup.webp"
          showButton={showButton}
        />
      </div>
    </FormProvider>
  );
};

export default EnquiryForm;
