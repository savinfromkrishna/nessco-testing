"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MessageBox } from "@/components/ui/MessageBox";
import { cn } from "@/lib/utils";
import CountrySelect from "@/components/ui/CountrySelect";
import { usePathname, useRouter } from "next/navigation";
import { useForm as useFormContext } from "@/app/[country]/[locale]/context/FormContext";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const SignupFormDemo = ({ formId }: { formId: string }) => {
  const { submitForm } = useFormContext();
  const [countryCode, setCountryCode] = useState("us");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const pathParts = pathname.split("/");
    if (pathParts.length > 1) {
      const newCountryCode = pathParts[1].toLowerCase();
      if (newCountryCode.length === 2) setCountryCode(newCountryCode);
    }
  }, [pathname, router]);

  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    mobilenumber: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitForm({ ...formValues, formId });
      toast.success("Form submitted successfully!", {
        duration: 3000,
        position: "top-right",
        style: { borderRadius: "10px", background: "#4caf50", color: "#fff" },
      });
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

  return (
    <>
      <Toaster />
      <motion.div
        className="w-full max-w-md mx-auto px-4"
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={transition}
      >
        <form className="space-y-3" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="fullname">Name</Label>
            <Input
              id="fullname"
              placeholder="Tyler Durden"
              value={formValues.fullname}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="projectmayhem@fc.com"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="mobilenumber">Phone Number</Label>
            <CountrySelect
              isoCode={countryCode}
              onPhoneNumberChange={(phoneNumber) =>
                setFormValues((prev) => ({
                  ...prev,
                  mobilenumber: phoneNumber,
                }))
              }
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="message">Your Message</Label>
            <MessageBox
              id="message"
              placeholder="Type your message here..."
              value={formValues.message}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
          <motion.button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
            <BottomGradient />
          </motion.button>
        </form>
      </motion.div>
    </>
  );
};

export const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-1.5 w-full", className)}>
    {children}
  </div>
);

export default SignupFormDemo;
