"use client";
import { addToCartAction } from "@/actions/addToCartActions";
import Tooltip from "@/app/(auth)/_components/Tooltip";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const CartButton = ({ productId }: { productId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
      const {fetchCart} = useCartStore();

      const showMessage = (message: string)=>{
        setTooltipMessage(message);
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
        }, 3000);
      }


  const handleSubmit = async () => {
    setIsLoading(true);
    setShowTooltip(false);
    try {
      const result = await addToCartAction(productId);
      if (result.success) {
        await fetchCart();
      }else if(result.message){
        showMessage(result.message);
      }
    } catch {
      showMessage("Error adding to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {showTooltip && (
        <Tooltip text={tooltipMessage} position="top"/>
      )}
      <form action={handleSubmit}>
        <button 
        disabled={isLoading}
        type="submit"
        className="mb-2 h-10 md:h-15 w-full bg-primary text-white text-base md:text-2xl p-4 flex justify-center items-center rounded hover:shadow-article active:shadow-button-active duration-300 cursor-pointer relative">
          <ShoppingCart className="absolute left-8 w-8 h-8" />
          <p className="text-center">IN CART</p>
        </button>
      </form>
    </div>
  );
};

export default CartButton;
