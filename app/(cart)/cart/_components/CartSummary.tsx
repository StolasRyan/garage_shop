import { buttonStyles } from "@/app/styles";
import Bonuses from "@/app/(catalog)/catalog/[category]/(productPage)/[id]/_components/Bonuses";
import { CartItem } from "@/types/cart";
import { formatPrice } from "@/utils/formatPrice";
import { getGoodsWord } from "@/utils/getGoodsWord";

interface CartSummaryProps {
  visibleCartItems: CartItem[];
  totalMaxPrice: number;
  totalDiscount: number;
  finalPrice: number;
  totalBonuses: number;
  isMinimumReached: boolean;
}

const CartSummary = ({
  visibleCartItems,
  totalMaxPrice,
  totalDiscount,
  finalPrice,
  totalBonuses,
  isMinimumReached,
}: CartSummaryProps) => {
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
            <span className="font-bold text-2xl text-gray-600">{formatPrice(finalPrice)} ₽</span>
        </div>
        <Bonuses bonus={totalBonuses}/>
        <div className="w-full">
            {!isMinimumReached && (
                <div className="bg-[#d80000] rounded text-white text-xs text-center mx-auto py-0.75 px-1.5 mb-4 w-full">
                    Minimum order amount 1000 ₽
                </div>
            )}

            <button
            disabled={!isMinimumReached || visibleCartItems.length === 0}
            className={`p-3 rounded mx-auto w-full text-2xl cursor-pointer ${
              isMinimumReached && visibleCartItems.length > 0
                ? buttonStyles.active
                : buttonStyles.inactive
            }`}
          >
            Check order
          </button>
        </div>
    </div>

    </>
  )
};

export default CartSummary;
