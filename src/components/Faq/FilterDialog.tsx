import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/ScrollArea";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCategories: { name: string }[];
  selectedCategories: string[];
  toggleCategory: (categoryName: string) => void;
}

export function FilterDialog({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  filteredCategories,
  selectedCategories,
  toggleCategory,
}: FilterDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white   sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Filter Categories</DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Categories</h2>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mt-2"
              >
                <path
                  d="M3 7H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6 12H18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 17H14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-[1rem] border-gray-200"
              />
            </div>
          </div>

          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {filteredCategories.map((category) => (
                <label
                  key={category.name}
                  className="flex items-center space-x-2 cursor-pointer py-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span
                    className={cn(
                      "text-sm",
                      selectedCategories.includes(category.name)
                        ? "text-gray-900 font-medium"
                        : "text-gray-600"
                    )}
                  >
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </ScrollArea>
        </div>
        <Button onClick={onClose}>Apply Filters</Button>
      </DialogContent>
    </Dialog>
  );
}
