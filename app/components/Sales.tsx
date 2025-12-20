import Image from 'next/image'
import ProductCard from './ProductCard'
import { ProductCardProps } from '@/types/product'
import { shuffleArray } from '@/utils/shuffleArray';

const Sales = async () => {

    let products: ProductCardProps[]=[];
    let error = null;

    try{
        const res = await fetch(`${process.env.NEXT_PUBLICK_BASE_URL!}/api/products?category=actions`);
        products = await res.json();
        products = shuffleArray(products);
    }catch(e){
        error = "Failed to fetch SALES products";
        console.error("Sales products error",e);
    }

    if(error){
        return <div className="text-red-500">Error:{error}</div>
    }

  return (
    <section>
        <div className='flex flex-col justify-center xl:max-w-302'>
            <div className='mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between'>
                <h2 className='text-2xl md:text-4xl text-left font-bold'>Sales</h2>
                <button className='flex flex-row items-center gap-x-2 cursor-pointer'>
                    <p className='text-base text-center text-gray-500 hover:text-gray-300'>All sales</p>
                    <Image src='arrow-right.svg' alt='Arrow' width={24} height={24} sizes='24px'/>
                </button>
            </div>
            <ul className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8'>
                {products.slice(0, 4).map((product, index) => (
                    <li key={product._id} 
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

export default Sales