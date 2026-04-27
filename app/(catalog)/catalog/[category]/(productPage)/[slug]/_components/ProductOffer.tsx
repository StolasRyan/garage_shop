import { CONFIG } from '@/config/config';
import { formatPrice } from '@/utils/formatPrice';
import { Info } from 'lucide-react';
import React from 'react'

interface ProductOfferProps{
    discountedPrice: number;
    cardPrice: number
}

const ProductOffer = ({discountedPrice, cardPrice}:ProductOfferProps) => {
  return (
    <div className="flex flex-row justify-between gap-2 leading-1.5 h-19 mb-4">
      <div className="flex flex-col justify-end">
        <p className="text-[#606060] text-xl md:text-lg lg:text-2xl mb-1.5">
          {formatPrice(discountedPrice)} ₽
        </p>
        <p className="text-[#bfbfbf] text-[8px] md:text-xs">Simple Price</p>
      </div>

      <div className="flex flex-col justify-end">
        <p className="text-main-text text-2xl lg:text-4xl font-bold mb-1.5 text-right">
          {formatPrice(cardPrice)} ₽
        </p>
        <div className="flex flex-row gap-x-1 items-center relative">
          <p className="text-[#bfbfbf] text-[8px] md:text-xs">
            With discount card
          </p>
          <div className="group relative cursor-help">
            <Info className='w-4 h-4'/>
            <div className="absolute right-0 bottom-full mb-2 w-48 p-3 bg-white border border-gray-200 shadow-lg rounded-md text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
              Discount {CONFIG.CARD_DISCOUNT_PERCENT}% by loaylity card.
              Take your card asking a cashier or order with delivery.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductOffer