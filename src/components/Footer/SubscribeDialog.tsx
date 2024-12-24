"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormFields from "../Contact/FormFileds";
import { FormSchemaType } from "../Contact/schemas/schemas";


interface SubscribeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const SubscribeDialog: React.FC<SubscribeDialogProps> = ({
  isOpen,
  onClose,
  email,
}) => {
  const [formValues, setFormValues] = useState<FormSchemaType>({
    fullname: "",
    email: email,
    mobilenumber: "",
  });

  const [errors, setErrors] = useState<Partial<FormSchemaType>>({});

  useEffect(() => {
    setFormValues(prevValues => ({
      ...prevValues,
      email: email
    }));
  }, [email]);
 console.log(setErrors);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically validate the form and send the data to your server
    console.log("Submitting:", formValues);
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Thank you for subscribing!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Complete your subscription</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormFields
            onChange={setFormValues}
            values={formValues}
            errors={errors}
          />
          <Button type="submit" className="bg-gradient-to-r from-[#483d73] to-red-700 text-white font-medium font-poppins py-2 px-6 w-full rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            Subscribe
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeDialog;

