import { useCategoryStore } from "@/store/categoryStore";
import { FilterType, SortField } from "../types";
import { ChevronUp } from "lucide-react";

const AdvancedFilters = () => {
  const {
    filterType,
    sortField,
    sortDirection,
    setSortField,
    setSortDirection,
    setFilterType,
  } = useCategoryStore();

  const handleSortFieldChange = (field: SortField)=>{
    setSortField(field);
  }

  const handleSortDirectionChange = (direction: 'asc' | 'desc')=>{
    setSortDirection(direction);
  }

  return (
    <div className="mt-4 pt-4 rounded bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Search by:
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as FilterType)}
            className="text-sm w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          >
            <option value="all">All fields</option>
            <option value="name">Name</option>
            <option value="slug">Slug</option>
            <option value="description">Description</option>
            <option value="keywords">Key words</option>
            <option value="author">Author</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Sort by:
          </label>
          <select
            value={sortField}
            onChange={(e) => handleSortFieldChange(e.target.value as SortField)}
            className="text-sm w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          >
            <option value="numericId">ID</option>
            <option value="name">Name</option>
            <option value="slug">Slug</option>
            <option value="createdAt">Creation date</option>
            <option value="author">Author</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Sort order:
          </label>
          <div className="flex gap-2 text-sm">
            <button
            onClick={() => handleSortDirectionChange('asc')}
            className={`flex-1 flex items-center justify-around px-4 py-2 border rounded cursor-pointer duration-300 ${
                sortDirection === 'asc' 
                ? 'bg-purple-50 border-purple-300 text-primary'
                : 'border-gray-300 hover:bg-gray-50 '
            }`}
            >
                <ChevronUp className="w-4 h-4 "/> By growth
            </button>
            <button
            onClick={() => handleSortDirectionChange('desc')}
            className={`flex-1 flex items-center justify-around px-4 py-2 border rounded cursor-pointer duration-300 ${
                sortDirection === 'desc' 
                ? 'bg-purple-50 border-purple-300 text-primary'
                : 'border-gray-300 hover:bg-gray-50 '
            }`}
            >
                <ChevronUp className="w-4 h-4 rotate-180"/> By decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
