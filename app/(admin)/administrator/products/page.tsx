 'use client'
 import { buttonStyles } from '@/app/styles'

import Link from 'next/link'

 const AdminProducts = () => {
   

   return (
     <div className='p-6'>
        <h1 className='text-2xl text-gray-600 font-bold mb-6'>Administration Panel</h1>

        <div className='grid gap-4'>
            <Link
            href={'/administrator/products/add-product'}
            className={`${buttonStyles.active} [&&]:justify-start rounded px-4 py-2 w-full md:w-1/2`}
            >
              Add product
            </Link>
            <Link
            href={'/administrator/products/products-list'}
            className={`${buttonStyles.active} [&&]:justify-start rounded px-4 py-2 w-full md:w-1/2`}
            >
              Products list
            </Link>
            <Link
            href={'/administrator/products/products-list'}
            className={`${buttonStyles.active} [&&]:justify-start rounded px-4 py-2 w-full md:w-1/2`}
            >
              Edit product
            </Link>
        </div>
     </div>
   )
 }
 
 export default AdminProducts