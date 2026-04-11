"use client";

import { addToCartAction } from "@/actions/addToCartActions";
import { useState } from "react";
//import CartActionMessage from "./CartActionMessage";
import { useCartStore } from "@/store/cartStore";
import {
  removeMultipleOrderItemsAction,
  updateOrderItemQuantityAction,
} from "@/actions/orderActions";
import QuantitySelector from "../(cart)/cart/_components/QuantitySelector";
import Tooltip from "../(auth)/_components/Tooltip";

interface AddToCartButtonProps {
  productId: string;
  availableQuantity: number;
}

const AddToCartButton = ({
  productId,
  availableQuantity,
}: AddToCartButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const { cartItems, updateCart, fetchCart } = useCartStore();

  const cartItem = cartItems.find((item) => item.productId === productId);
  const currentQuantity = cartItem?.quantity || 0;
  const isInCart = currentQuantity > 0;
  const displayQuantity = Math.min(currentQuantity, availableQuantity);
  const hasReachedMaxQuantity = displayQuantity >= availableQuantity;
  const isOutOfStock = availableQuantity === 0;

  const showMessage = (message: string)=>{
    setTooltipMessage(message);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  }

  const handleAddToCart = async () => {

    if(hasReachedMaxQuantity){
      showMessage("Only " + availableQuantity + " left in stock");
      return;
    }

    setIsLoading(true);
    setShowTooltip(false);
    try {
      const result = await addToCartAction(productId);
      if (!result.success && result.message) {
        showMessage(result.message);
      }

      if (result.success) {
        await fetchCart();
      }
    } catch (error) {
      console.error("Error adding to cart", error);
      showMessage("Error adding to cart" );
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityUpdate = async (newQuantity: number) => {
    if (newQuantity < 0 || isLoading) return;

    if(newQuantity > availableQuantity){
      showMessage("Only " + availableQuantity + " left in stock");
      return;
    }

    setIsLoading(true);
    setShowTooltip(false);

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

  const handleDecrement = () => {
    const newQuantity = Math.max(0, currentQuantity - 1);
    handleQuantityUpdate(newQuantity);
  };
  const handleIncrement = () => {
    if(hasReachedMaxQuantity){
      showMessage("Only " + availableQuantity + " left in stock");
      return;
    }
    handleQuantityUpdate(currentQuantity + 1);
  };

  const getButtonText = () => {
    if (isOutOfStock) return "Out of stock";
    if (isLoading) return "...";
    return "Add to cart";
  };

  return (
    <div className="relative">
      {showTooltip && (
        <Tooltip text={tooltipMessage} position="top" cardPosition={true}/>
      )}
      {isInCart && !isOutOfStock ? (
        <div className="absolute flex justify-center bottom-2 left-2 right-2">
          <QuantitySelector
            quantity={displayQuantity}
            isUpdating={isLoading}
            isOutOfStock={isOutOfStock}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            onProductCard={true}
          />
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          type="submit"
          disabled={isOutOfStock || isLoading || hasReachedMaxQuantity}
          className={`absolute border bottom-2 left-2 right-2 h-10 flex rounded justify-center items-center duration-300 select-none ${
            isOutOfStock || hasReachedMaxQuantity
            ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
            :' border-(--color-primary) hover:text-white hover:bg-primary hover:border-transparent active:shadow-(--shadow-button-active) text-(--color-primary) transition-all  cursor-pointer'
          } `}
        >
          {getButtonText()}
          {/* {isLoading ? (
            <Loader2 size={32} className="animate-spin text-white" />
          ) : (
            <span className="flex flex-row gap-4">
              <ShoppingCart size={20} /> Add to cart
            </span>
          )} */}
        </button>
      )}

      {/* {message && (
        <CartActionMessage message={message} onClose={() => setMessage(null)} />
      )} */}
    </div>
  );
};

export default AddToCartButton;
