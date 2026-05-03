import { useState } from 'react'
import { DragHandle } from '../../_components/DragHandle'
import { ChevronDown } from 'lucide-react'
import MobileCategoryHeader from './MobileCategoryHeader'
import MobileExpandableContent from './MobileExpandableContent'
import { SortableItemProps } from '../types'

const MobileCategoryCard = ({category, displayNumericId, onDelete,onEdit, isDragging = false}:SortableItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div 
    onClick={()=>setIsExpanded(!isExpanded)}
    className={`p-4 hover:bg-gray-50 tet-sm duration-200 ${
        isDragging
        ? 'opacity-60 bg-linear-to-r from-blue-50 to-green-50 shadow-lg border-2 border-green-400 transform scale-[0.995]'
        : 'hover:shadow-sm'
    }`}>
        <div className='flex justify-between items-start'>
            <div className='flex-1 min-w-0'>
                <div className='flex items-start gap-3 mb-1'>
                    <DragHandle/>
                    <MobileCategoryHeader displayNumericId={displayNumericId} category={category}/>
                </div>
            </div>

            <button
            className='ml-2 text-gray-400 hover:text-gray-600 cursor-pointer duration-300 shrink-0 mt-1'
            >
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                }`}/>
            </button>
        </div>
        {isExpanded && (
            <MobileExpandableContent category={category} onDelete={onDelete} onEdit={onEdit}/>
        )}
    </div>
  )
}

export default MobileCategoryCard