import { formStyles } from '@/app/styles'
import React from 'react'

interface BrandProps {
    brand: string
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Brand = ({ brand, onChangeAction }: BrandProps) => {
  return (
    <div>
          <label className="block text-sm font-medium mb-2">
            Brand <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="brand"
            required
            value={brand}
            onChange={onChangeAction}
            className={`${formStyles.input} bg-white [&&]:w-full`}
          />
        </div>
  )
}

export default Brand