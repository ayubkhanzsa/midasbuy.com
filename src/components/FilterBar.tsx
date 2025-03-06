
import { Filter, ChevronDown } from "lucide-react";

interface FilterBarProps {
  onFilterChange?: (filter: string) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-6">
      <div className="mb-4 sm:mb-0">
        <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-midasbuy-navy">
          <div className="text-sm text-gray-300 font-medium mr-2">PAYMENT CHANNELS</div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="mr-4 flex items-center space-x-2 px-4 py-2 rounded-lg bg-midasbuy-navy">
          <div className="text-sm text-gray-300 font-medium">UC</div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        
        <button className="px-4 py-2 rounded-lg bg-midasbuy-navy flex items-center">
          <Filter className="w-5 h-5 mr-2 text-gray-300" />
          <span className="text-sm text-gray-300 font-medium">Filter</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
