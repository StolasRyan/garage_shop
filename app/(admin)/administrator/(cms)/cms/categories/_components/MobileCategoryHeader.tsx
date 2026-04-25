import { MobileCategoryHeaderProps } from '../types'

const MobileCategoryHeader= ({category, displayNumericId}:MobileCategoryHeaderProps) => {
  return (
    <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2 mb-1'>
            <span 
            title='Order number'
            className='inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-xs font-medium shrink-0'>
                {displayNumericId || '-'}
            </span>
            <h3
            title={category.name}
            className='font-medium text-gray-900 text-lg wrap-break-word'
            >
                {category.name}
            </h3>
        </div>

        <div className='flex flex-wrap items-center gap-2 mt-2'>
            <code
            title='Link (slug)'
            className='text-xs bg-gray-100 px-2 py-1 rounded font-mono break-all'
            >
                {category.slug}
            </code>
            <span
        className="text-xs text-gray-500 shrink-0"
        title={`Creation date: ${new Date(category.createdAt).toLocaleDateString("ru-RU")}`}
      >
        {new Date(category.createdAt).toLocaleDateString("ru-RU")}
      </span>
        </div>
    </div>
  )
}

export default MobileCategoryHeader