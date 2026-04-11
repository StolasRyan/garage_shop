import { CONFIG } from '@/config/config';
import { Order } from '@/types/order';
import { useState } from 'react';
import OrderCard from './OrderCard';

interface UserOrdersListProps { 
  orders: Order[]
}

const UserOrdersList = ({orders}:UserOrdersListProps) => {
  const [visibleOrdersCount, setVisibleOrdersCount] = useState<number>(CONFIG.ITEMS_PER_ORDERS_PAGE)
  const visibleOrders = orders.slice(0, visibleOrdersCount)
  const hasMoreOrders = visibleOrdersCount < orders.length;

  const handleShowMore =()=>{
    setVisibleOrdersCount((prevCount) => prevCount + CONFIG.ITEMS_PER_ORDERS_PAGE);
  }
  return (
    <div>
      <div className='space-y-30'>
        {visibleOrders.map((order)=>(
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
      {hasMoreOrders && (
        <div className='flex justify-center mt-15'>
          <button
          className='bg-gray-200 hover:shadow-button-secondary text-gray-600 w-50 h-10 px-2 flex items-center justify-center'
          onClick={handleShowMore}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  )
}

export default UserOrdersList