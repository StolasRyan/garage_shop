import { formStyles } from '@/app/styles'
import React from 'react'

interface DiscountProps {
    discount: string,
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean
}

const Discount = ({discount, onChangeAction, required = false}:DiscountProps) => {
  return (
     <div>
                <label className='block text-sm font-medium mb-2'>
                   Discount(%) {required && <span className="text-red-700">*</span>}
                </label>
                <input 
                type="number" 
                name='discountPercent'
                step={`0.01`}
                required={required}
                value={discount}
                onChange={onChangeAction}
                className={`${formStyles.input} bg-white [&&]:w-full`}
                min={0}
                max={100}
                />
            </div>
  )
}

export default Discount