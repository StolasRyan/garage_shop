import { useCategoryStore } from '@/store/categoryStore'
import { ChevronUp, ImageIcon } from 'lucide-react'
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
        <div className='grid lg:grid-cols-[32px_40px_50px_100px_80px_120px_120px_80px_80px_80px_100px]  xl:grid-cols-[32px_40px_50px_120px_80px_160px_160px_80px_80px_80px_100px] gap-2 items-center justify-between'>
            <div className='w-8'></div>
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
          className="text-center cursor-pointer hover:text-gray-700 flex items-center justify-center"
          onClick={() => handleSort("articles")}
          title="Сортировать по кол-ву статей"
        >
          Articles {renderSortIcon("articles")}
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