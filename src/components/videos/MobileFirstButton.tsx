import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter } from 'lucide-react';

interface MobileFilterButtonProps {
  onClick: () => void;
  filterText: string;
}

const MobileFilterButton: React.FC<MobileFilterButtonProps> = ({ onClick, filterText }) => {
  return (
    <Button
      variant="outline"
      className="w-full flex justify-between items-center py-2 px-4 lg:hidden"
      onClick={onClick}
    >
      <span>{filterText}</span>
      <Filter className="h-4 w-4" />
    </Button>
  );
};

export default MobileFilterButton;

