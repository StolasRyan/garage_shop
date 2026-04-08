import Bonuses from '@/app/(catalog)/catalog/[category]/(productPage)/[id]/_components/Bonuses';
import { CartItem } from '@/types/cart';
import { formatPrice } from '@/utils/formatPrice'
import { getGoodsWord } from '@/utils/getGoodsWord'

interface PriceSummaryProps {
    totalMaxPrice: number;
    totalDiscount: number;
    visibleCartItems:CartItem[] ;
    finalPrice: number;
    totalBonuses: number;
}

const PriceSummary = ({totalMaxPrice, totalDiscount, visibleCartItems, finalPrice, totalBonuses}:PriceSummaryProps) => {
  return (
    <>
    <div className="flex flex-col gap-y-2.5 pb-6 border-b-2 border-gray-200">
            <div className="flex flex-row justify-between">
              <p className="text-gray-500">
                {visibleCartItems.length} {getGoodsWord(visibleCartItems.length)}
              </p>
              <p className="">-{formatPrice(totalMaxPrice)} </p>
            </div>
    
            <div className="flex flex-row justify-between">
              <p className="text-gray-500">Discount</p>
              <p className="text-primary"> {formatPrice(totalDiscount)} ₽</p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between gap-y-6">
        <div className="text-base text-gray-500 flex flex-row justify-between items-center w-full">
          <span>Total:</span>
          <span className="font-bold text-2xl text-gray-600">
            {formatPrice(finalPrice)} ₽
          </span>
        </div>
        <Bonuses bonus={totalBonuses} />
      </div>
    </>
  )
}

export default PriceSummary