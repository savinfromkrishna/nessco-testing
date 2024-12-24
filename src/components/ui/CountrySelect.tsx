"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search, ChevronDown } from 'lucide-react';
import { ScrollArea } from "@/components/ui/ScrollArea";
import countriesData from "./constant/CountryData";
import { cn } from "@/lib/utils";
import BlurImage from "../ui/BlurImage";
type Country = {
  name: string;
  code: string;
  phone: string;
};
type CountrySelectProps = {
  isoCode: string;
  onPhoneNumberChange: (phoneNumber: string) => void;
  error?: string;
  className?: string;
};
export default function CountrySelect({
  isoCode,
  onPhoneNumberChange,
  className,
}: CountrySelectProps) {
  const [countries] = useState<Country[]>(countriesData);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const preSelectedCountry = countriesData.find(
      (country) => country.code === isoCode.toUpperCase()
    );
    setSelectedCountry(preSelectedCountry || countriesData[0]);
  }, [isoCode]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setPhoneNumber("");
    onPhoneNumberChange(country.phone);
  };
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedInput = input.replace(/[^0-9]/g, "");
    setPhoneNumber(formattedInput);
    onPhoneNumberChange(selectedCountry?.phone + formattedInput);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div
      className={cn(
        "py-[0.1rem] border border-[#483d73] px-[0.2rem] text-[0.9rem] rounded-[0.3rem] bg-[#f9fafb] focus:ring-2 focus:ring-[#483d73] transition-all duration-200",
        className
      )}
    >
      <div className="flex space-x-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <motion.div
              className="relative w-28"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-6 overflow-hidden rounded-sm">
                {selectedCountry && (
                  <BlurImage
                    src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                    width={200}
                    height={200}
                    
                    alt={`${selectedCountry.name} flag`}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <Input
                value={selectedCountry?.phone || ""}
                readOnly
                className="pl-10 pr-8 cursor-pointer"
              />
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="p-4 space-y-4"
            >
              <h2 className="text-xl font-semibold text-center">
                Select a country
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search countries"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <ScrollArea className="h-[300px] sm:max-w-[420px] rounded-md border w-auto border-gray-200 dark:border-gray-700">
                <motion.div layout className="p-2 grid gap-1">
                  <AnimatePresence>
                    {filteredCountries?.map((country) => (
                      <motion.div
                        key={country?.code}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => handleCountrySelect(country)}
                        >
                          <span className="mr-3 h-5 w-7 overflow-hidden rounded-sm">
                            <img
                              src={`https://flagcdn.com/w40/${country?.code.toLowerCase()}.png`}
                              width="40"
                              alt={`${country?.name} flag`}
                              className="h-full w-full object-cover"
                            />
                          </span>
                          <span className="flex-1 truncate text-left">
                            {country?.name}
                          </span>
                          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                            {country?.phone}
                          </span>
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </ScrollArea>
            </motion.div>
          </DialogContent>
        </Dialog>
        <div className="flex-1">
          <Input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

