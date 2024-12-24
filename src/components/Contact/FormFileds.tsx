"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CountrySelect from "@/components/ui/CountrySelect";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FormSchemaType } from "./schemas/schemas";

export interface FormValues extends FormSchemaType {
  // Extending from FormSchemaType to ensure type consistency
}

interface FormFieldsProps {
  onChange: (values: FormValues) => void;
  values: FormValues;
  errors?: Partial<FormValues>;
  inline?: boolean;
}

const FormFields: React.FC<FormFieldsProps> = ({
  onChange,
  values,
  inline = false,
}) => {
  const pathname = usePathname();
  const countryCode = pathname.split("/")[1]?.toLowerCase() || "in";
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof FormValues, boolean>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const updatedValues = { ...values, [id]: value };
    onChange(updatedValues);
    setTouchedFields((prev) => ({ ...prev, [id]: true }));
  };

  const handleBlur = (id: keyof FormValues) => {
    setTouchedFields((prev) => ({ ...prev, [id]: true }));
  };

  const validateField = (id: keyof FormValues, value: string): string => {
    if (!value.trim()) {
      return `Please enter your ${id === 'fullname' ? 'full name' : id}`;
    }
    if (id === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      return 'Please enter a valid email address';
    }
    if (id === 'mobilenumber' && !/^\+?[1-9]\d{1,14}$/.test(value)) {
      return 'Please enter a valid phone number';
    }
    return '';
  };

  return (
    <div className={cn("space-y-4", inline && "lg:space-y-1")}>
      <div
        className={cn(
          "space-y-4",
          inline && "lg:flex lg:space-x-0 lg:space-y-0"
        )}
      >
        <LabelInputContainer className={inline ? "lg:w-1/2" : "w-full"}>
          {!inline && (
            <Label
              htmlFor="fullname"
              className="text-[0.8rem] font-medium text-gray-600"
            >
              Full Name
            </Label>
          )}
          <Input
            id="fullname"
            placeholder="Enter your full name"
            value={values.fullname}
            onChange={handleChange}
            onBlur={() => handleBlur('fullname')}
            required
            className={cn(
              "border border-[#483d73] py-[0.4rem] px-[0.5rem] text-[0.9rem] rounded-[0.3rem] bg-[#f9fafb] focus:ring-2 focus:ring-[#483d73] transition-all duration-200",
              touchedFields.fullname && validateField('fullname', values.fullname) && "border-red-500"
            )}
          />
          {touchedFields.fullname && (
            <p className="text-red-500 text-xs mt-1">{validateField('fullname', values.fullname)}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className={inline ? "lg:w-1/2" : "w-full"}>
          {!inline && (
            <Label
              htmlFor="email"
              className="text-[0.8rem] font-medium text-gray-600"
            >
              Email Address
            </Label>
          )}
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            required
            className={cn(
              "border py-[0.4rem] px-[0.5rem] text-[0.9rem] rounded-[0.3rem] bg-[#f9fafb] focus:ring-2 focus:ring-[#483d73] transition-all duration-200",
              touchedFields.email && validateField('email', values.email) && "border-red-500"
            )}
          />
          {touchedFields.email && (
            <p className="text-red-500 text-xs mt-1">{validateField('email', values.email)}</p>
          )}
        </LabelInputContainer>
      </div>
      <LabelInputContainer className="w-full">
        {!inline && (
          <Label
            htmlFor="mobilenumber"
            className="text-[0.8rem] font-medium text-gray-600"
          >
            Phone Number
          </Label>
        )}
        <CountrySelect
          isoCode={countryCode}
          onPhoneNumberChange={(phoneNumber) => {
            const updatedValues = { ...values, mobilenumber: phoneNumber };
            onChange(updatedValues);
            setTouchedFields((prev) => ({ ...prev, mobilenumber: true }));
          }}
          error={touchedFields.mobilenumber ? validateField('mobilenumber', values.mobilenumber) : ''}
        />
        {touchedFields.mobilenumber && (
          <p className="text-red-500 text-xs mt-1">{validateField('mobilenumber', values.mobilenumber)}</p>
        )}
      </LabelInputContainer>
    </div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-1", className)}>{children}</div>
);

export default FormFields;

