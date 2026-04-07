import { formatPrice } from "@/utils/formatPrice";
import { memo } from "react";

interface PriceDisplayProps {
  finalPrice: number;
  priceWithDiscount: number;
  totalFinalPrice: number;
  totalPriceWithoutCard: number;
  hasDiscount: boolean;
  hasLoyaltyCard: boolean;
  isOutOfStock: boolean;
}

const PriceDisplay = memo(function PriceDisplay({
  finalPrice,
  priceWithDiscount,
  hasDiscount,
  isOutOfStock,
}: PriceDisplayProps) {

    

  return(
    <>
    <div className="mt-2 text-xs flex gap-x-2 items-baseline">
        {hasDiscount ? (
            <>
            <div className="flex flex-col">
                <span className={`font-bold ${isOutOfStock ? "text-gray-500" : "" }`}>{formatPrice(finalPrice)} ₽</span>
                <span className="text-gray-400">With card</span>
            </div>
            <div className="flex flex-col">
                <span className={`text-gray-600 ${isOutOfStock ? "text-gray-400 line-through" : "" }`}>{formatPrice(priceWithDiscount)} ₽</span>
                <span className="text-gray-400">Regular</span>
            </div>
            </>
        ):(
            <div className="flex flex-col">
                <span className={`font-bold ${isOutOfStock ? "text-gray-500" : "" }`}>{formatPrice(priceWithDiscount)} ₽</span>
            </div>
        )}
        <span className="text-gray-400">for psc.</span>
    </div>
    </>
  )
});

export default PriceDisplay;
