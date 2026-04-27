import React from 'react'
import { PromptSectionProps } from '../../../../types'

const PromptSection = ({
    prompt,
    onPromptChange,
    isGenerating
}: PromptSectionProps) => {

    const examplePrompts = [
        'Tasty pizza with cheese, macros',
        'Fresh fruits on wooden table, natural light',
        'Creamy aroma coffe , minimalistic design',
        'Juisy steak with grilled vegetables, photorealistic rendering',
        'Colorful salad in glass bowl, bright colors',
        'Homemade chocolate cake with fresh berries, cosy interior',
        'Ice cream with strawberry, summer day',
        'Sushi on a rock plate, elegant design',
    ]

  return (
    <div className='mb-4'>
        <label className='block text-sm font-semibold text-gray-700 mb-2'>
            What do you want to create?
        </label>
        <textarea 
        value={prompt}
        onChange={onPromptChange}
        placeholder='Describe image in details'
        rows={3}
        disabled={isGenerating}
        className='w-full px-4 py-3 text-base border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none'
        />
        <div className='hidden md:block mt-3 p-3 bg-gray-50 rounded-lg'>
            <p className='text-xs font-medium text-gray-700 mb-1'>
                Prompts examples:
            </p>
            <ul className='text-xs text-gray-600 space-y-1'>
                {examplePrompts.map((prompt, index) => (
                    <li key={index} >
                       • {prompt}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default PromptSection