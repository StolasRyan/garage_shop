import { useCategoryStore } from '@/store/categoryStore'
import { ChevronUp, ImageIcon } from 'lucide-react'
import React from 'react'
import { SortField } from '../types';

const TableHeader = () => {
    const {currentPage,sortField, sortDirection, searchQuery,setSortField, setSortDirection, loadCategories} = useCategoryStore();

    const handleSort = async(field: SortField) => {
        if(sortField===field){
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        }else{
            setSortField(field);
            setSortDirection('asc');
        }
        await loadCategories({page:currentPage , search: searchQuery});
    }

    const renderSortIcon = (field: SortField)=>{
        if(sortField !== field) return null;

        return (
            <ChevronUp className={`w-4 h-4 ml-1 transition-transform duration-200${
                sortDirection === 'desc' ? ' rotate-180' : ''
            }`}/>
        )
    }

  return (
    <div className='hidden lg:block border border-gray-200'>
        <div className='grid grid-cols-[0.3fr_0.5fr_1fr_2fr_2fr_2fr_2fr_1fr_1fr_2fr] gap-2 p-4 bg-gray-200 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider'>
            <div></div>
            <div 
            onClick={()=>handleSort('numericId')}
            title='Sort by ID'
            className='text-center cursor-pointer hover:text-gray-700 flex items-center justify-center'>
                ID {renderSortIcon('numericId')}
            </div>

            <div
            title='Category Image'
             className='text-center flex items-center justify-center'>
                <ImageIcon className='w-4 h-4'/>
            </div>

            <div
            onClick={()=>handleSort('name')}
            title='Sort by Name'
            className='cursor-pointer hover:text-gray-700 flex items-center'
            >
                Name {renderSortIcon('name')}
            </div>

            <div
            onClick={()=>handleSort('slug')}
            title='Sort by Slug'
            className='cursor-pointer hover:text-gray-700 flex items-center'
            >
                Slug {renderSortIcon('slug')}
            </div>
            <div>Description</div>
            <div className='text-center'>Keywords</div>
            <div
            onClick={()=>handleSort('author')}
            title='Sort by author'
             className='text-center cursor-pointer hover:text-gray-700 flex items-center justify-center'>
                Author {renderSortIcon('author')}
            </div>

            <div
            onClick={()=>handleSort('createdAt')}
            title='Sort by creation date'
            className='cursor-pointer hover:text-gray-700 flex items-center'
            >
                Created At {renderSortIcon('createdAt')}
            </div>
            <div className='text-center'>Actions</div>
        </div>
    </div>
  )
}

export default TableHeader