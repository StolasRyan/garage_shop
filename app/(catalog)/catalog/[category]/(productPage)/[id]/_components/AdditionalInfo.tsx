import { formatWeight } from '@/utils/formatWeight';
import React from 'react'

interface AdditionalInfoProps{
    brand:string;
    manufacturer:string;
    weight:number
}

const AdditionalInfo = ({brand, manufacturer, weight}:AdditionalInfoProps) => { 
  return (
    <div className='space-y-1 text-xs text-gray-600'>
        <div className='flex justify-between bg-gray-100 py-1 px-2'>
            <span className='font-medium'>Brand:</span>
            <span>{brand}</span>
        </div>
        <div className='flex justify-between py-1 px-2'>
            <span className='font-medium'>Country:</span>
            <span>{manufacturer}</span>
        </div>
        <div className='flex justify-between bg-gray-200 py-1 px-2'>
            <span className='font-medium'>Packed:</span>
            <span>{formatWeight(weight)}</span>
        </div>
        
    </div>
  )
}

export default AdditionalInfo