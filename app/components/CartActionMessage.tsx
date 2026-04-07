import { X } from 'lucide-react';
import React from 'react'

interface CartActionMessageProps {
message:{
    success: boolean,
    message: string
};
onClose: () => void
}

const CartActionMessage = ({message, onClose}: CartActionMessageProps) => {
  return (
    <div className={`absolute bottom-2.25 left-0 right-0 mx-2 px-3 py-3 rounded text-xs text-left z-10 shadow-lg ${
        message.success ? 'bg-lime-50 text-lime-600 border border-lime-500' : 'bg-amber-50 text-amber-600 border border-amber-500'
    }`}>
        <div className='flex justify-between items-start gap-2'>
            <p className='flex-1 leading-4 pr-2'>{message.message}</p>
            <button
            onClick={onClose}
            aria-label='Close'
            className='shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-main-text hover:bg-gray-200 duration-300 text-base font-bold cursor-pointer'
            >
                <X className='w-4 h-4'/>
            </button>
        </div>
    </div>
  )
}

export default CartActionMessage