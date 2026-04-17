import { ProductCardProps } from '@/types/product'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface SimillarProductsProps{
    currentProduct: ProductCardProps;
}

interface SimillarProduct{
    id:string;
    title:string;
    img:string;
    basePrice: number;
    discountPercent:number;
    categories:string[];
}

const SimillarProducts = async({currentProduct}:SimillarProductsProps) => {
    try {
        const category = currentProduct.categories[0];
        if(!category) return null;

        const response = await fetch(
            `${process.env.NEXT_PUBLICK_BASE_URL}/api/products/similar-products?productId=${currentProduct.id}&category=${category}&limit=4`,
            {
                next: {revalidate: 3600}
            }
        )

        if(!response.ok){
            throw new Error("Failed to upload similar products")
        }

        const data = await response.json();
        const similarProducts:SimillarProduct[] = data.similarProducts;

        if(similarProducts.length === 0) return null;

        const calculatePrice = (product:SimillarProduct)=>{
            const discount = product.basePrice * (product.discountPercent/100);
            return Math.round(product.basePrice - discount)
        }

        return (
    <div className='mx-auto flex flex-col items-center'>
        <div className='w-full max-w-82 md:max-w-172 lg:max-w-42 xl:max-w-42'>
            <h3 className='text-sm md:text-lg font-semibold md-2 text-gray-600 text-left'>Similar:</h3>

        </div>

        <div className='flex flex-row lg:flex-col xl:flex-col gap-2 md:gap-4 justify-center lg:justify-start xl:justify-start'>
            {similarProducts.map((product)=>(
                <Link
                key={product.id}
                href={`/catalog/product/${product.id}`}
                className='text-gray-600 text-sm md:text-lg flex flex-col w-19.5 h-15.5 md:w-43 md:h-39.5 lg:h-26 xl:w-42 xl:h-26 rounded bg-white shadow-md duration-300 hover:shadow-lg'
                >
                    <div className='relative w-full h-6.25 md:h-27.75 lg:h-14.25 xl:h-14.25 shrink-0'>
                        <Image
                        src={product.img}
                        alt={product.title}
                        fill
                        className='object-contain rounded'
                        sizes='(max-width: 768px) 78px, (max-width: 1280px) 172px, 168px'
                        />
                    </div>
                    <div className='flex items-center font-bold p-2 md:p-2.5'>
                        {calculatePrice(product)} ₽
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
    } catch (error) {
        console.error('Failed to fetch similar products:', error);
        return null
    }

  
}

export default SimillarProducts