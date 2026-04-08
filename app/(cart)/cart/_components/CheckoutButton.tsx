import { buttonStyles } from '@/app/styles'
import { CartItem } from '@/types/cart'


interface CheckoutButtonProps {
    isMinimumReached: boolean
    visibleCartItems: CartItem[]
    onCheckout: () => void
    isCheckout: boolean
}

const CheckoutButton = ({isMinimumReached, visibleCartItems, onCheckout,isCheckout}:CheckoutButtonProps) => {
    if(isCheckout) return null;
  return (
    <button
                  onClick={onCheckout}
                  disabled={!isMinimumReached || visibleCartItems.length === 0}
                  className={`p-3 rounded mx-auto w-full text-2xl cursor-pointer ${
                    isMinimumReached && visibleCartItems.length > 0
                      ? buttonStyles.active
                      : buttonStyles.inactive
                  }`}
                >
                  Checkout order
                </button>
  )
}

export default CheckoutButton