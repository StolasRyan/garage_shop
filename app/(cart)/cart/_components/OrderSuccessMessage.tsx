import { CONFIG } from "@/config/config";
import { useCartStore } from "@/store/cartStore";
import { getBonusesWord } from "@/utils/bonusWord";
import { CreditCard, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";


interface OrderSuccessMessageProps {
    orderNumber: string | null;
}

const OrderSuccessMessage = ({orderNumber}: OrderSuccessMessageProps) => {
    const {pricing, useBonuses, resetAfterOrder} = useCartStore();
    const {totalBonuses,maxBonusUse,totalPrice}=pricing;
    const router = useRouter();

    const usedBonuses = Math.min(maxBonusUse, Math.floor((totalPrice * CONFIG.MAX_BOUSES_PERCENT) / 100));

    const baseStyles = "h-10 rounded w-full text-base justify-center items-center duration-300";

    const handleToOrder = () => {
        resetAfterOrder();
        router.push('/user-orders');
    }
  return (
    <div className="text-center p-4 bg-purple-100 text-purple-600 rounde border border-primary">
        <div className="font-bold text-lg mb-2">Your order placed successfully!</div>
        <div className="mb-3">
            Order number: <strong>{orderNumber}</strong>
        </div>
        <div className="text-sm mb-3">
            You can pay the order by card or cash on delivery.
            We will call you to confirm the order.
        </div>
        {useBonuses && (
            <div className="text-sm mb-3 text-primary flex items-center justify-center gap-2">
                <CreditCard size={16} className="shrink-0"/>
                {usedBonuses} 
                {getBonusesWord(usedBonuses)} will be used after the order is paid.
            </div>
        )}
        <div className="text-sm mb-3 text-primary flex items-center justify-center gap-2">
                <CreditCard size={16} className="shrink-0"/>
                After delivery you will receive {totalBonuses} {getBonusesWord(totalBonuses)}.
        </div>
        <button
        onClick={handleToOrder}
        className={`${baseStyles} bg-primary hover:shadow-button-default active:shadow-button-active text-white cursor-pointer duration-300 flex items-center justify-center gap-2`}
        >
         <ShoppingBag size={16}/>   To orders
        </button>
    </div>
  )
}

export default OrderSuccessMessage