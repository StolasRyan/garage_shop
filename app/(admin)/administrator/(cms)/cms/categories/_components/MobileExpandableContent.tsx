import React from 'react'
import { MobileExpandableContentProps } from '../../types';

const MobileExpandableContent = ({category, onDelete,onEdit}:MobileExpandableContentProps) => {

    const handleEdit = (e: React.MouseEvent) =>{
        e.stopPropagation();
        window.scrollTo({top: 0, behavior: 'smooth'});
        onEdit(category);
    }
    const handleDelete = (e: React.MouseEvent) =>{
        e.stopPropagation();
        onDelete(category._id.toString());
    }
  return (
    <div className='mt-4 space-y-3 pt-4 border-t border-gray-200'>
        {category.description && (
            <div>
                <div className='text-xs font-medium text-gray-700 mb-1'>Description</div>
                <div
                className='text-gray-600 wrap-break-word'
                title={category.description}
                >
                    {category.description}
                </div>
            </div>
        )}
        <div>
            <div className='text-xs font-medium text-gray-700 mb-1'>Author</div>
            <div className='wrap-break-word' title={category.author || 'Unknown'}>
                {category.author || (<span className='text-gray-400 text-center'>Unknown</span>)}
            </div>
        </div>
        {(category.keywords || []).length > 0 && (
            <div>
                <div className='text-xs font-medium text-gray-700 mb-1'>Keywords</div>
                <div className='flex flex-wrap gap-1'>
                    {(category.keywords || []).map((keyword, index) => (
                        <span
                         key={index} 
                         className='inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded wrap-break-words max-w-full'
                         title={keyword}
                         >
                             {keyword}
                         </span>
                    ))}
                </div>
            </div>
        )}

        <div className='flex gap-2 pt-2'>
            <button
            onClick={handleEdit}
            title='Edit category'
            className='flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs cursor-pointer duration-300'
            >
                Edit
            </button>
            <button
            onClick={handleDelete}
            title='Delete category'
            className='flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-xs cursor-pointer duration-300'
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default MobileExpandableContent