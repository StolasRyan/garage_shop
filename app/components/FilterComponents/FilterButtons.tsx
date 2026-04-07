'use client'

import Link from "next/link"
import { useSearchParams } from "next/navigation"

const FILTERS = [
    {key: 'our-production', label: 'Self produced goods'},
    {key: 'healthy-food', label: 'Healthy food'},
    {key: 'non-gmo', label: 'Non GMO'},
]
const FilterButtons = ({basePath}: {basePath: string}) => {
    const searchParams = useSearchParams();
    const currentFilter = searchParams.getAll("filter");
    
    const buildFilterLink = (filterKey: string)=>{
        const params = new URLSearchParams(searchParams.toString());

        if(currentFilter.includes(filterKey)){
            params.delete("filter");
            currentFilter.filter((filter)=> filter !== filterKey).forEach((filter)=>{
                params.append('filter', filter)
            })
        }else{
            params.append('filter', filterKey)
        }

        params.delete('page');

        return `${basePath}?${params.toString()}`
    }

    const isFilterActive = (filterKey: string) => currentFilter.includes(filterKey);


  return (
    <div className="flex flex-row flex-wrap gap-4 items-center mb-5">
        {FILTERS.map((filter)=>(
            <Link 
            key={filter.key} 
            href={buildFilterLink(filter.key)}
            className={`h-8 p-2 flex text-xs rounded justify-center items-center duration-300 cursor-pointer 
            ${isFilterActive(filter.key) 
                ? 'bg-(--color-primary) text-white hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active)' 
                : 'bg-gray-100 text-gray-700 hover:shadow-(--shadow-secondary) active:shadow-(--shadow-button-active)'}
            `}
            >
                {filter.label}
            </Link>
        ))}
    </div>
  )
}

export default FilterButtons