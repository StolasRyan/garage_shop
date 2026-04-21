import { ImageIcon } from 'lucide-react'
import React from 'react'

const TableHeader = () => {
  return (
    <div className='hidden lg:block border border-gray-200'>
        <div className='grid grid-cols-[0.3fr_0.5fr_1fr_2fr_2fr_2fr_2fr_1fr_1fr_2fr] gap-2 p-4 bg-gray-200 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider'>
            <div></div>
            <div 
            title='Sort by ID'
            className='text-center cursor-pointer hover:text-gray-700 flex items-center justify-center'>
                ID
            </div>

            <div
            title='Category Image'
             className='text-center flex items-center justify-center'>
                <ImageIcon className='w-4 h-4'/>
            </div>

            <div
            title='Sort by Name'
            className='cursor-pointer hover:text-gray-700 flex items-center'
            >
                Name
            </div>

            <div
            title='Sort by Slug'
            className='cursor-pointer hover:text-gray-700 flex items-center'
            >
                Slug
            </div>
            <div>Description</div>
            <div className='text-center'>Keywords</div>
            <div
            title='Sort by author'
             className='text-center cursor-pointer hover:text-gray-700 flex items-center justify-center'>
                Author
            </div>

            <div
            title='Sort by creation date'
            className='cursor-pointer hover:text-gray-700 flex items-center'
            >
                Created
            </div>
            <div className='text-center'>Actions</div>
        </div>
    </div>
  )
}

export default TableHeader