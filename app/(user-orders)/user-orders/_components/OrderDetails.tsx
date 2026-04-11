import { Order } from '@/types/order'
import React from 'react'

const OrderDetails: React.FC<{order:Order}> = ({order}) => {
  return (
    <>
    <div className='mb-4 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-3 lg:gap-6 text-sm mt-10'>
        <p className='text-gray-600 lg:text-base'>Delivery address:</p>
        <p className='font-medium lg:text-base wrap-break-word'>
            {order.deliveryAddress.city}, {order.deliveryAddress.street} - {order.deliveryAddress.house}, {order.deliveryAddress.apartment && `apartment ${order.deliveryAddress.apartment}`}
        </p>
    </div>

    <div className='mt-4 pt-4 border-t border-gray-200 space-y-3 text-sm'>
        <div className='flex justify-between items-center'>
            <span className='lg:text-base text-gray-600'>Discount</span>
            <span className='lg:text-base font-medium text-red-500'>-{order.discountAmount.toLocaleString('ru-RU')} ₽</span>
        </div>
        <div className='flex justify-between items-center'>
            <span className='lg:text-base text-gray-600'>Used bonuses:</span>
            <span className='lg:text-base font-medium'>{order.usedBonuses.toLocaleString('ru-RU')}</span>
        </div>
        <div className='flex justify-between items-center'>
            <span className='lg:text-base text-gray-600'>Bonuses achived:</span>
            <span className='lg:text-base font-medium text-lime-600'>+{order.earnedBonuses.toLocaleString('ru-RU')}</span>
        </div>
        <div className='flex justify-between items-center'>
            <span className='lg:text-base text-gray-600'>Payed by:</span>
            <span className='lg:text-base font-medium'>
                {order.paymentMethod === 'online' ? 'Online by card' : 'Cash after delivery'}
            </span>
        </div>
    </div>
    </>
  )
}

export default OrderDetails