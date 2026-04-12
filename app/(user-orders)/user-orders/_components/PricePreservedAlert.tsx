import { formatPrice } from '@/utils/formatPrice'
import { CheckCircle2Icon } from 'lucide-react'
import React from 'react'

const PricePreservedAlert = ({orderTotal}:{orderTotal:number}) => {
  return (
    <div className='mb-4 p-4 bg-lime-50 border border-lime-200 rounded-lg'>
        <div className='flex justify-between items-start'>
            <div className='flex-1'>
                <h3 className='text-lime-800 font-semibold mb-2 flex items-center gap-2'>
                    <CheckCircle2Icon className='w-5 h-5' />
                    Price is saved
                </h3>
                <p className='text-lime-700 text-sm'>
                    The price of the product has not changed since the moment of order creation.
                </p>
                <div className='mt-2 p-2 bg-lime-100 rounded'>
                    <p className='text-lime-800 font-medium text-sm'>
                        Total amount: {formatPrice(orderTotal)} ₽
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PricePreservedAlert