"use client";

import { addToCartAction } from "@/actions/addToCartActions";
import { useState } from "react";
import CartActionMessage from "./CartActionMessage";
import { useCartStore } from "@/store/cartStore";
import {
  removeMultipleOrderItemsAction,
  updateOrderItemQuantityAction,
} from "@/actions/orderActions";
import QuantitySelector from "../(cart)/cart/_components/QuantitySelector";
import { Loader2, ShoppingCart } from "lucide-react";

const AddToCartButton = ({ productId }: { productId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const { cartItems, updateCart, fetchCart } = useCartStore();

  const cartItem = cartItems.find((item) => item.productId === productId);
  const currentQuantity = cartItem?.quantity || 0;
  const isInCart = currentQuantity > 0;

  const handleAddToCart = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const result = await addToCartAction(productId);
      if (!result.success && result.message) {
        setMessage(result);
      }

      if (result.success) {
        await fetchCart();
      }
    } catch (error) {
      console.error("Error adding to cart", error);
      setMessage({ success: false, message: "Error adding to cart" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityUpdate = async (newQuantity: number) => {
    if (newQuantity < 0 || isLoading) return;

    setIsLoading(true);

    try {
      let updatedCartItems;
      if (newQuantity === 0) {
        updatedCartItems = cartItems.filter(
          (item) => item.productId !== productId,
        );
        updateCart(updatedCartItems);
        await removeMultipleOrderItemsAction([productId]);
      } else {
        updatedCartItems = cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item,
        );
        updateCart(updatedCartItems);
        await updateOrderItemQuantityAction(productId, newQuantity);
      }
      await fetchCart();
    } catch (error) {
      console.error("Error updating quantity", error);
      await fetchCart();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = () =>{
    const newQuantity = Math.max(0, currentQuantity - 1);
    handleQuantityUpdate(newQuantity);
  }
  const handleIncrement = () => {
    handleQuantityUpdate(currentQuantity + 1);
  };

  return (
    <div className="relative">
      {isInCart ? (
        <div className="absolute flex justify-center bottom-2 left-2 right-2">
        <QuantitySelector
          quantity={currentQuantity}
          isUpdating={isLoading}
          isOutOfStock={false}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
          onProductCard={true}
        />
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          type="submit"
          disabled={isLoading}
          className="absolute border bottom-2 left-2 right-2 border-(--color-primary) hover:text-white hover:bg-primary hover:border-transparent active:shadow-(--shadow-button-active) h-10 rounded flex justify-center items-center text-(--color-primary) transition-all duration-300 cursor-pointer select-none"
        >
          {
            isLoading 
            ? (<Loader2 size={32} className="animate-spin text-white" />) 
            : (<span className="flex flex-row gap-4"><ShoppingCart size={20} /> Add to cart</span>)
          }
        </button>
      )}

      {message && (
        <CartActionMessage message={message} onClose={() => setMessage(null)} />
      )}
    </div>
  );
};

export default AddToCartButton;
