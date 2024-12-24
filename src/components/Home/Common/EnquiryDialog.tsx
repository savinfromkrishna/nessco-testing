"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FormFields, { FormValues } from "@/components/Contact/FormFileds";
import BlurImage from "@/components/ui/BlurImage";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-5xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface EnquiryDialogProps {
  buttonText: string;
}

const EnquiryDialog: React.FC<EnquiryDialogProps> = ({ buttonText }) => {
  const [formValues, setFormValues] = React.useState<FormValues>({
    fullname: "",
    email: "",
    mobilenumber: "",
  });

  const handleFormChange = (values: FormValues) => {
    setFormValues(values);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formValues);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full flex items-center justify-between text-primary-foreground border-2 border-white h-[3.5rem] w-40 sm:h-16 sm:w-60 md:h-16 md:w-60 lg:h-16 lg:w-60 text-xs sm:text-sm md:text-base lg:text-lg bg-clip-border relative group custom-gradient-border transition-all duration-300 overflow-hidden">
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] bg-white rounded-[0.5rem] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:block">
            <BlurImage
              height={600}
              width={600}
              src="https://www.nesscoindia.com/Assets/images/resource/popup.webp"
              alt="Beautiful scenery"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Enquiry Form</h2>
            <form onSubmit={handleSubmit}>
              <FormFields onChange={handleFormChange} values={formValues} />
              <Button type="submit" className="mt-4 w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryDialog;
