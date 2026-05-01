import React from 'react'
import { ArticleMetaProps } from '../../../types'
import { Eye } from 'lucide-react'

const ArticleMeta = ({categoryName,publishedAt,views}:ArticleMetaProps) => {
  return (
    <div className='flex gap-4 mb-6 text-gray-600'>
        <span>Category: {categoryName}</span>
        {publishedAt && <span>Published: {new Date(publishedAt).toLocaleDateString("ru-RU")}</span>}
        <div className='flex items-center gap-1'>
            <Eye className='w-4 h-4'/>
            <span><span className='hidden md:inline-block pr-1'>Views:{' '}</span>{views.toLocaleString('ru-RU')}</span>
        </div>
    </div>
  )
}

export default ArticleMeta