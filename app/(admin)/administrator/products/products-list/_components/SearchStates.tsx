


import { Loader2, Search } from 'lucide-react'
import React from 'react'

type SearchStatesProps = {
    hasSearched: boolean
    loading: boolean
    searchTerm: string;
}

const SearchStates = ({hasSearched, loading}:SearchStatesProps) => {
    if(!hasSearched && !loading){
        return (
            <div className='text-center py-12 text-gray-600'>
                <Search size={48} className='mx-auto mb-4 text-gray-200'/>
                <p className='text-lg'>Enter search keywords</p>
                <p className='text-sm'>Find products by name or sku</p>
            </div>
        )
    }
    if(loading){
        return(
            <div className='text-center py-12'>
                <Loader2 size={32} className='mx-auto animate-spin text-primary'/>
                <p className='mt-2'>Searching...</p>
            </div>
        )
    }
  return null
}

export default SearchStates