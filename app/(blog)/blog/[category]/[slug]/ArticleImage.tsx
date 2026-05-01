import React from 'react'
import { ArticleImageProps } from '../../types'
import Image from 'next/image';

const ArticleImage = ({ image, imageAlt, articleName}:ArticleImageProps) => {
    if(!image) return null;
  return (
    <div className='mb-6'>
        <Image
        src={image}
        alt={imageAlt || articleName}
        width={800}
        height={450}
        className="object-cover w-full max-h-96 rounded"
        priority={false}
        />
    </div>
  )
}

export default ArticleImage