

import { CheckCircle2 } from 'lucide-react'
import React from 'react'

const SEOReccomendations = ({reccomendations}: {reccomendations: string[]}) => {



  return (
    <div className='mt-6 p-4 bg-blue-50 rounded-lg'>
        <h3 className='font-semibold text-blue-800 mb-2'>Reccomendations for SEO:</h3>
        <ul className='text-sm space-y-2 text-blue-700'>
            {reccomendations.map((rec, index) => (
                <li key={index} className='flex items-start gap-2'>
                    <CheckCircle2 className='mt-0.5 h-4 w-4 text-blue-600 shrink-0'/>
                    <span>{rec}</span>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default SEOReccomendations