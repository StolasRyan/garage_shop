'use client'
import { CommentSortButtonsProps } from "@/app/(blog)/blog/types"
import { memo } from "react"


export  const CommentsSortButtons = memo(({sortOrder, onSortChange}:CommentSortButtonsProps) => {
  return (
    <div className="flex rounded-full shadow-sm">
            <button
            onClick={()=>onSortChange('newest')}
            className={`px-4 py-2 text-sm font-medium rounded-l-full  cursor-pointer duration-300 ${
              sortOrder === "newest"
              ? 'bg-purple-500 text-white border-purple-500 hover:bg-purple-600' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            >
              Newest
            </button>
            <button
            onClick={()=>onSortChange('oldest')}
            className={`px-4 py-2 text-sm font-medium rounded-r-full border cursor-pointer duration-300 ${
              sortOrder === "oldest"
              ? 'bg-purple-500 text-white border-purple-500 hover:bg-purple-600' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            >
              Older
            </button>
          </div>
  )
})

CommentsSortButtons.displayName = 'CommentsSortButtons'

