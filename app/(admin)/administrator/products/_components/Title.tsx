import { formStyles } from '@/app/styles'
import React from 'react'

interface TitleProps {
    title: string
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Title = ({title, onChangeAction}:TitleProps) => {
  return (
    <div>
        <label className='block text-sm font-medium mb-2'>
            Product Name <span className='text-red-700'>*</span>
        </label>
        <input type="text" 
        name='title'
        required
        value={title}
        onChange={onChangeAction}
        className={`${formStyles.input} bg-white [&&]:w-full`}
        />
    </div>
  )
}

export default Title