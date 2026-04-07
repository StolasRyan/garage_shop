"use client";
import { addToCartAction } from "@/actions/addToCartActions";
import CartActionMessage from "@/app/components/CartActionMessage";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const CartButton = ({ productId }: { productId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
      const {fetchCart} = useCartStore();


  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const result = await addToCartAction(productId);
      setMessage(result);
      if (result.success) {
        await fetchCart();
      }
    } catch {
      setMessage({ success: false, message: "Error adding to cart" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <form action={handleSubmit}>
        <button 
        disabled={isLoading}
        type="submit"
        className="mb-2 h-10 md:h-15 w-full bg-primary text-white text-base md:text-2xl p-4 flex justify-center items-center rounded hover:shadow-article active:shadow-button-active duration-300 cursor-pointer relative">
          <ShoppingCart className="absolute left-8 w-8 h-8" />
          <p className="text-center">IN CART</p>
        </button>
      </form>
      {message && (<CartActionMessage message={message} onClose={() => setMessage(null)}/>)}
    </div>
  );
};

export default CartButton;
