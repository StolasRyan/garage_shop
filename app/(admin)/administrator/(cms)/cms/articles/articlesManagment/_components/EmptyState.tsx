import { useArticlesManagmentStore } from '@/store/articlesManagmentStore'
import React from 'react'

const EmptyState = () => {
    const {searchQuery} = useArticlesManagmentStore();
  return (
    <div className='p-8 text-center text-gray-500'>
        {searchQuery ? 'No results found.' : 'No articles yet.'}
    </div>
  )
}

export default EmptyState