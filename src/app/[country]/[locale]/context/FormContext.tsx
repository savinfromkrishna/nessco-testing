"use client"
import { VisitData, useTrackUserSource } from '@/hooks/useTrackUserSource';
import React, { createContext, useContext, useState } from 'react';

interface FormData {
  [key: string]: any;
}

interface FormContextProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  submitForm: (formData: FormData) => Promise<void>;
  visitData: VisitData | null;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({});
  const visitData = useTrackUserSource();

  const submitForm = async (data: FormData) => {
    setFormData(data); // Update central state

    // Combine form data with visit data
    const combinedData = {
      ...data,
      visitData: visitData
    };

    // Submit data to API
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(combinedData),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      // Handle successful submission
      console.log('Form submitted successfully');
    } catch (error) {
      // Handle submission error
      console.error('Error submitting form:', error);
    }
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, submitForm, visitData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useForm must be used within a FormProvider');
  return context;
};

