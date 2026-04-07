import { formStyles } from '@/app/styles'
import React from 'react'

type ManufacturerProps = {
    manufacturer: string
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Manufacturer = ({ manufacturer, onChangeAction }: ManufacturerProps) => {
  return (
     <div>
              <label className="block text-sm font-medium mb-2">
                Manufacturer <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="manufacturer"
                required
                value={manufacturer}
                onChange={onChangeAction}
                className={`${formStyles.input} bg-white [&&]:w-full`}
              />
            </div>
  )
}

export default Manufacturer