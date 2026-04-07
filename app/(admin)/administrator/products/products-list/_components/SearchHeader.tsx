import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SearchHeader = () => {
  return (
    <>
    <div className='flex flex-col md:flex-row justify-between gap-4 items-center cursor-pointer'> 
        <Link
        href={'/administrator'}
        className='flex items-center gap-2 hover:underline'
        >
            <ArrowLeft size={20}/>
            Back to Controls Panel
        </Link>
        <Link
        href='/administrator/products/add-product'
        className='bg-primary hover:shadow-button-default active:shadow-button-active text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer'
        >
            <Plus size={16}/>
            Add product
        </Link>
    </div>
    <h1 className='text-2xl font-bold mb-6 mt-2'>Search</h1>
    </>
  )
}

export default SearchHeader