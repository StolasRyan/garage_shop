import { formStyles } from '@/app/styles'
import React from 'react'

interface DescriptionProps {
    description: string,
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Description = ({description, onChangeAction}:DescriptionProps) => {
  return (
    <div>
            <label className='block text-sm font-medium mb-2'>
                Descriprion <span className='text-red-700'>*</span>
            </label>
            <input 
            type="text" 
            name='description'
            required
            value={description}
            onChange={onChangeAction}
            className={`${formStyles.input} bg-white [&&]:w-full`}
            />
        </div>
  )
}

export default Description