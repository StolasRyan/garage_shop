import { useCategoryStore } from "@/store/categoryStore";
import { useState } from "react";
import { FilterControlsProps } from "../../types";
import { Filter, X } from "lucide-react";

const FilterControls = ({ onToggleFilters }: FilterControlsProps) => {
  const {
    filterType,
    sortField,
    sortDirection,
    searchQuery,
    setFilterType,
    setSortField,
    setSortDirection,
    handleSearchChange,
    loadCategoties
  } = useCategoryStore();
  const [localShowFilters, setLocalShowFilters] = useState(false);

  const hasActiveFilters = Boolean(
    filterType !== "all" ||
    sortField !== "numericId" ||
    sortDirection !== "asc" ||
    searchQuery !== "",
  );

  const resetFilters = () => {
    handleSearchChange("");
    setFilterType("all");
    setSortField("numericId");
    setSortDirection("asc");
    loadCategoties({page:1, search: '', filterBy:filterType});
  };

  const handleToggleFilters = () => {
    const newValue = !localShowFilters;
    setLocalShowFilters(newValue);
    if(onToggleFilters){
        onToggleFilters(newValue);
    }
  };

  return(
    <div className="flex items-center gap-2">
        <button
        onClick={handleToggleFilters}
        className={`flex items-center gap-2 px-4 py-2 border rounded cursor-pointer duration-300 ${
          localShowFilters
            ? "bg-gray-100 border-gray-300"
            : "border-gray-300 hover:bg-gray-50"
        }`}
        title={localShowFilters ? 'Close filters' : 'Open filters'}
        >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
        </button>

        {hasActiveFilters && (
            <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer duration-300 border-gray-300 hover:bg-gray-50"
            title="Clear filters"
            >
                <X className="w-4 h-4" /> 
                <span className="hidden sm:inline">Clear filters</span>
            </button>
        )}
    </div>
  )
};

export default FilterControls;
