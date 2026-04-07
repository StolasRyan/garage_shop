import { formStyles } from '@/app/styles'
import React from 'react'

interface BasePriceProps {
    basePrice: string
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const BasePrice = ({basePrice, onChangeAction}:BasePriceProps) => {
  return (
    <div>
            <label className='block text-sm font-medium mb-2'>
                Base Price (RUB) <span className='text-red-700'>*</span>
            </label>
            <input 
            type="number" 
            name='basePrice'
            step={`0.01`}
            required
            value={basePrice}
            onChange={onChangeAction}
            className={`${formStyles.input} bg-white [&&]:w-full`}
            />
        </div>
  )
}

export default BasePrice