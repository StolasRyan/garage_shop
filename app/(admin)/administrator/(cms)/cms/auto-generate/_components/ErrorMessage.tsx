import { AlertCircle } from 'lucide-react'
import React from 'react'

const ErrorMessage = ({error}: {error: string}) => {
  return (
    <div className='rounded-xl p-4 bg-red-50 border border-red-200'>
        <div className='flex'>
             <div className='shrink-0'>
                <AlertCircle className='w-5 h-5 text-red-400'/>
             </div>
             <div className='ml-3'>
                <p className='text-xs font-medium text-red-800'>{error}</p>
             </div>
        </div>
    </div>
  )
}

export default ErrorMessage