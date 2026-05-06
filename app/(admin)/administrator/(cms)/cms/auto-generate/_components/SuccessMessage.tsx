import { Loader2 } from 'lucide-react'
import React from 'react'

const SuccessMessage = ({success}:{success:string}) => {
  return (
    <div className='ronded-xl p-4 bg-lime-50 border border-lime-200'>
        <div className='flex items-center'>
            <Loader2 className='w-5 h-5 text-lime-600 mr-2 animate-spin' />
            <div>
                <p className='text-xs font-medium text-lime-800'>{success}</p>
                <p className='text-xs text-lime-600 mt-1'>
                    Throug several seconds you will be redirected to the editing page
                </p>
            </div>
        </div>
    </div>
  )
}

export default SuccessMessage