import Image from 'next/image'
import db from '@/data/database.json'
import ProductCard from './ProductCard'

const Purchaes = () => {

    const userPurchases = db.users[0].purchases.map((purchase)=>{
        const product = db.products.find((product)=>product.id === purchase.id)
        if(!product)return undefined;
        const {discountPercent, ...rest} = product;
        void discountPercent;
        return rest;
    }).filter((item)=> item !== undefined)
  return (
    <section>
        <div className='flex flex-col justify-center xl:max-w-302'>
            <div className='mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between'>
                <h2 className='text-2xl md:text-4xl text-left font-bold'>Purchases</h2>
                <button className='flex flex-row items-center gap-x-2 cursor-pointer'>
                    <p className='text-base text-center text-gray-500 hover:text-gray-300'>All Shops</p>
                    <Image src='arrow-right.svg' alt='Arrow' width={24} height={24} sizes='24px'/>
                </button>
            </div>
            <ul className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8'>
                {userPurchases.slice(0, 4).map((product, index) => (
                    <li key={product.id} 
                    className={`${index >= 4 ? 'hidden': ''}
                    ${index >= 3 ? 'md:hidden xl:block' : ''}
                    ${index >= 4 ? 'xl:hidden' : ''}
                    `}>
                        <ProductCard {...product}/>
                    </li>
                ))}
            </ul>
        </div>
    </section>
  )
}

export default Purchaes