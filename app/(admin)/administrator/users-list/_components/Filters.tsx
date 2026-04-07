import { buttonStyles } from "@/app/styles";
import { FiltersState } from "@/types/filtersState";
import React from "react";


interface FiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

const Filters = ({
  filters,
  onFilterChange,
  onClearFilters,
  onApplyFilters,
}: FiltersProps) => {


    const  handleInputChange = (field: keyof FiltersState, value:string)=>{
        onFilterChange({
            ...filters,
            [field]:value,
        })
    }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <div className="flex gap-2">
                <button
                onClick={onApplyFilters}
                className={`${buttonStyles.active} [&&]:px-3 [&&]:text-xs rounded  cursor-pointer`}
                >
                    Find
                </button>
                <button
                onClick={onClearFilters }
                className="px-3 py-2 text-xs bg-gray-100 rounded justify-center items-center active:shadow-(--shadow-button-active)  cursor-pointer"
                >
                    Clear
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label className="block text-xs font-medium mb-1">ID</label>
                <input 
                value={filters.id}
                onChange={(e)=>handleInputChange('id', e.target.value)}
                type="text" 
                placeholder="Search by ID"
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div>
                <label className="block text-xs font-medium mb-1">Name</label>
                <input 
                type="text" 
                value={filters.name}
                onChange={(e)=>handleInputChange('name', e.target.value)}
                placeholder="Search by Name"
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div>
                <label className="block text-xs font-medium mb-1">Surname</label>
                <input 
                value={filters.surname}
                onChange={(e)=>handleInputChange('surname', e.target.value)}
                type="text" 
                placeholder="Search by Surname"
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div>
                <label className="block text-xs font-medium mb-1">E-mail</label>
                <input 
                value={filters.email}
                onChange={(e)=>handleInputChange('email', e.target.value)}
                type="text" 
                placeholder="Search by E-mail"
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div>
                <label className="block text-xs font-medium mb-1">Phone Number</label>
                <input 
                value={filters.phoneNumber}
                onChange={(e)=>handleInputChange('phoneNumber', e.target.value)}
                type="text" 
                placeholder="Search by Phone Number"
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div>
                <label className="block text-xs font-medium mb-1">Role</label>
               <select 
               className="w-full p-2 border border-gray-300 rounded"
                value={filters.role}
                onChange={(e)=>handleInputChange('role', e.target.value)}
               >
                    <option value="">All roles</option>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
               </select>
            </div>

            <div>
                <label className="block text-xs font-medium mb-1">Age from</label>
                <input 
                type="number" 
                value={filters.minAge}
                onChange={(e)=>handleInputChange('minAge', e.target.value)}
                min={0}
                placeholder="from"
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div>
                <label className="block text-xs font-medium mb-1">Age to</label>
                <input 
                value={filters.maxAge}
                onChange={(e)=>handleInputChange('maxAge', e.target.value)}
                min={0}
                type="number" 
                placeholder="to"
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div>
                <label className="block text-xs font-medium mb-1">Registered from</label>
                <input 
                 value={filters.startDate}
                onChange={(e)=>handleInputChange('startDate', e.target.value)}
                type="date" 
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div>
                <label className="block text-xs font-medium mb-1">Registered to</label>
                <input 
                 value={filters.endDate}
                onChange={(e)=>handleInputChange('endDate', e.target.value)}
                type="date" 
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
        </div>
    </div>
  )
};

export default Filters;
