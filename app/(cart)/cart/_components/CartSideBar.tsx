
import { CartSideBarProps } from '@/types/cart'
import BonusesSection from './BonusesSection'
import CartSummary from './CartSummary'

const CartSideBar = ({
    bonusesCount,
    useBonuses,
    onUseBonusesChange,
    totalPrice,
    visibleCartItems,
    totalMaxPrice,
    totalDiscount,
    finalPrice,
    totalBonuses,
    isMinimumReached,
}:CartSideBarProps) => {
  return (
     <div className="flex flex-col gap-y-6 md:w-63.75 xl:w-68">
          <BonusesSection
            bonusesCount={bonusesCount}
            useBonuses={useBonuses}
            onUseBonusesChange={onUseBonusesChange}
            totalPrice={totalPrice}
          />
          <CartSummary
            visibleCartItems={visibleCartItems}
            totalMaxPrice={totalMaxPrice}
            totalDiscount={totalDiscount}
            finalPrice={finalPrice}
            totalBonuses={totalBonuses}
            isMinimumReached={isMinimumReached}
          />
        </div>
  )
}

export default CartSideBar