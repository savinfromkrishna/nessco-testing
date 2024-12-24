"use client";
import React, { useState, useEffect } from "react";
import { X, ShoppingCart } from "lucide-react";
import BlurImage from "../ui/BlurImage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useForm } from "@/app/[country]/[locale]/context/FormContext";
import { Toaster, toast } from "react-hot-toast";
import { EnquiryItem } from "@/hooks/useEnquiryCart";
import FormFields, { FormValues } from "../Contact/FormFileds";
import { formSchema } from "@/lib/ValidationSchema";

interface EnquiryComponentProps {
  items: EnquiryItem[];
  onRemoveItem: (id: string) => void;
  maxItems?: number;
}

export default function EnquiryComponent({
  items,
  onRemoveItem,
}: EnquiryComponentProps) {
  const [cartItems, setCartItems] = useState<EnquiryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { submitForm } = useForm();

  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    email: "",
    mobilenumber: "",
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedItems = localStorage.getItem("cartItems");
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setCartItems(parsedItems);
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
        localStorage.removeItem("cartItems"); // Clear invalid data
      }
    }
  }, []);

  useEffect(() => {
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    onRemoveItem(id);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const openModal = () => setIsModalOpen(true);

  const validateForm = () => {
    try {
      formSchema.parse(formValues);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const zodError = JSON.parse(error.message);
        const newErrors: Partial<FormValues> = {};
        zodError.forEach((err: { path: string[]; message: string }) => {
          newErrors[err.path[0] as keyof FormValues] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await submitForm({
        ...formValues,
        formId: "EnquiryCart",
        cartItems: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
        })),
      });
      toast.success("Enquiry submitted successfully!", {
        duration: 3000,
        position: "top-center",
      });
      setIsModalOpen(false);
      clearCart();
      setFormValues({ fullname: "", email: "", mobilenumber: "" });
    } catch (error) {
      console.error("Failed to submit the enquiry:", error);
      toast.error("Error submitting the enquiry. Please try again.", {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        @media (max-width: 640px) {
          .enquiry-items {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding-bottom: 1rem;
          }
          .enquiry-items::-webkit-scrollbar {
            display: none;
          }
          .enquiry-item {
            flex: 0 0 auto;
            scroll-snap-align: start;
          }
          .sheet-content {
            display: flex;
            flex-direction: column;
          }
          .enquiry-item-image {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
      <Toaster />
      {cartItems.length > 0 && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="fixed left-4 bottom-32 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition-colors z-50"
              aria-label="Open enquiry cart"
            >
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {cartItems.length}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-max md:h-[24vh] bg-white sheet-content pb-20"
          >
            <div className="md:mt-4 overflow-x-auto scrollbar flex-grow">
              <div className="enquiry-items flex gap-2 lg:pb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="enquiry-item relative  md:mt-2   flex items-center bg-white border rounded-md p-2 hover:bg-gray-50 transition-colors duration-200 flex-shrink-0"
                  >
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-red-700 rounded-full" />
                    <div className="enquiry-item-image relative mr-3 flex-shrink-0">
                      <BlurImage
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col min-w-0 flex-grow pr-6">
                      <h3 className="text-xs font-medium text-gray-900 ">
                        {item.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="absolute top-0 right-1 text-gray-400 hover:text-gray-600"
                      aria-label="Remove item"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:absolute md:top-1 md:right-6 ">
              <Button
                onClick={openModal}
                className="w-full md:w-44 bg-gradient-to-r from-[#483d73] to-red-700 text-white font-medium font-poppins py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                <span className="text-white">
                  Enquire Now
                </span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[900px] bg-gray-50">
          <div className="rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="lg:block hidden pr-4">
                <div className="border-2 space-y-4 h-[50vh] overflow-y-auto rounded-xl p-4 scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col bg-[#f2f2f2] items-center justify-center h-44 w-full border rounded-[0.5rem] p-1"
                      >
                        <div className="text-sm font-semibold text-center mb-2">
                          {item.name}
                        </div>
                        <div className="bg-white w-full rounded-[0.5rem] h-auto enquiry-item-image">
                          <BlurImage
                            src={item.image}
                            alt={item.name}
                            width={176}
                            height={112}
                            className="rounded-md object-cover w-full h-32"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormFields
                  onChange={setFormValues}
                  values={formValues}
                  errors={errors}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="send message"
                  className="bg-gradient-to-r from-[#483d73] to-red-700 w-full text-white font-medium font-poppins py-2 px-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
