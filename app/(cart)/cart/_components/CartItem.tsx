"use client";
import { CartItemProps } from "@/types/cart";
import { memo, useState } from "react";
import CartSkeletons from "./CartSkeletons";
import { calculateFinalPrice, calculatePriceByCard } from "@/utils/calcPrices";
import { CONFIG } from "@/config/config";
import SelectionCheckbox from "./SelectionCheckbox";
import ProductImage from "./ProductImage";
import Link from "next/link";
import PriceDisplay from "./PriceDisplay";
import DiscountBadge from "./DiscountBadge";
import Tooltip from "@/app/(auth)/_components/Tooltip";
import QuantitySelector from "./QuantitySelector";
import { formatPrice } from "@/utils/formatPrice";
import { useCartStore } from "@/store/cartStore";

const CartItem = memo(function CartItem({
  item,
  productData,
  isSelected,
  onSelectionChange,
  onQuantityUpdate,
  
}: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const {hasLoyaltyCard} = useCartStore();

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 0) return;
    if (!productData) return;

    const maxQuantity = productData.quantity;

    if (newQuantity > maxQuantity) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    setIsUpdating(true);
    const previousQuantity = quantity;
    setQuantity(newQuantity);

    try {
      onQuantityUpdate(item.productId, newQuantity);
    } catch (error) {
      console.error("Failed to update quantity", error);
      setQuantity(previousQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!productData) return <CartSkeletons />;

  const priceWithDiscount = calculateFinalPrice(
    productData.basePrice || 0,
    productData.discountPercent || 0,
  );

  const finalPrice = hasLoyaltyCard
    ? calculatePriceByCard(priceWithDiscount, CONFIG.CARD_DISCOUNT_PERCENT)
    : priceWithDiscount;

  const totalFinalPrice = finalPrice * quantity;
  const totalPriceWithoutCard = priceWithDiscount * quantity;
  const isOutOfStock = productData.quantity === 0;
  const hasDiscount = productData ? productData.discountPercent! > 0 : false;

  return (
    <div
      className={`
        bg-white rounded flex shadow-cart-item hover:shadow-article relative duration-300
        ${isOutOfStock ? "opacity-60" : ""}
      `}
    >
      <SelectionCheckbox
        isSelected={isSelected}
        onSelectionChange={(checked) =>
          onSelectionChange(item.productId, checked)
        }
      />
      <div className="flex flex-row flex-wrap md:flex-row justify-between w-full md:flex-nowrap">
        <ProductImage
        productId={item.productId}
        title={productData.title}
        />
        <div className="flex flex-col flex-1 min-w-56 gap-y-2.5 p-2.5">
            <Link
            href={`/catalog/${productData.categories[0]}/${item.productId}`}
            className="text-base hover:text-primary cursor-pointer"
            >
                {productData.description}
            </Link>
            <div className="flex flex-row gap-x-2 items-center">
                <PriceDisplay
                finalPrice={finalPrice}
                priceWithDiscount={priceWithDiscount}
                totalFinalPrice={totalFinalPrice}
                totalPriceWithoutCard={totalPriceWithoutCard}
                hasDiscount={hasDiscount}
                hasLoyaltyCard={hasLoyaltyCard}
                isOutOfStock={isOutOfStock}
                />
                {hasDiscount && (
                    <DiscountBadge discountPercent={productData.discountPercent!} />
                )}
            </div>
        </div>
        {showTooltip &&(<Tooltip text="Limited" position="top"/>)}
        <div className="flex flex-wrap justify-between items-center gap-2 w-full md:w-30 xl:w-59 p-2 md:flex-nowrap md:flex-col md:justify-normal md:items-end xl:flex-row xl:items-start xl:justify-end">
            {!isOutOfStock && (
                <QuantitySelector
                quantity={quantity}
                isUpdating={isUpdating}
                isOutOfStock={isOutOfStock}
                onDecrement={()=>handleQuantityChange(quantity - 1)}
                onIncrement={()=>handleQuantityChange(quantity + 1)}
                />
            )}
            <div
            className={`text-sm md:text-lg font-bold text-right ${isOutOfStock ? "w-full flex justify-end" : "w-26"}`}
          >
            {isOutOfStock ? (
              <span className="font-normal md:text-base flex">
                Out of stock
              </span>
            ) : (
              <>
                <p>{formatPrice(totalFinalPrice)} ₽</p>
                {hasDiscount && (
                  <div className="flex flex-row gap-x-2 md:hidden">
                    <p className="line-through font-normal text-xs md:text-base text-gray-600">
                      {formatPrice(totalPriceWithoutCard)} ₽
                    </p>
                    <p className="font-normal text-xs text-primary">
                      {formatPrice(totalFinalPrice - totalPriceWithoutCard)} ₽
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
});

export default CartItem;
