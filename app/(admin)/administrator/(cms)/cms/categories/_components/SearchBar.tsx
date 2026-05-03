import { useCategoryStore } from '@/store/categoryStore'
import { Search, X } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  const {searchQuery, handleSearchChange, handleSearchClear,loadCategories,setCurrentPage} = useCategoryStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value)
  }

  const handleClear = async()=>{
    handleSearchClear();
    setCurrentPage(1);
    await loadCategories({page:1, search: ''});
  }

  const handleSearchClick = async ()=>{
      setCurrentPage(1);
      await loadCategories({page:1, search: searchQuery});
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === 'Enter'){
      e.preventDefault();
      handleSearchClick();
    }
  }

  return (
    <div className='relative flex-1'>
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'/>
      <input 
      type="text" 
      placeholder='Search'
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      autoComplete='off'
      className="w-full pl-10 pr-24 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary/60 focus:border-primary outline-none"
      />
      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
        {searchQuery &&(
          <button
          type='button'
          onClick={handleClear}
          className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer duration-300"
          title='Clear search field'
          >
            <X className='w-4 h-4'/>
          </button>
        )}
        <button
        type='button'
        onClick={handleSearchClick} 
        className="px-3 py-1 bg-primary/50 text-white rounded hover:bg-primary text-sm cursor-pointer duration-300"
        >
          Find
        </button>
      </div>
    </div>
  )
}

export default SearchBar