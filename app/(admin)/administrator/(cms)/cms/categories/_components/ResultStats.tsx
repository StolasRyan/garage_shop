import { useCategoryStore } from '@/store/categoryStore'
import React from 'react'

const ResultStats = () => {
    const {totalItems, totalAllItems, searchQuery}= useCategoryStore();
  return (
    <div className='mt-3 text-sm text-gray-500'>
        Showed: <span className='font-medium'>{totalItems}</span>{' of '}
        <span className='font-medium'>{totalAllItems}</span> categories.
        {searchQuery && <span className='ml-4'> By searching: &quot;<span className='font-medium'>{searchQuery}</span>&quot;</span>}
    </div>
  )
}

export default ResultStats