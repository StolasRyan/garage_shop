'use client';
import { CONFIG } from "@/config/config";
import { ProductCardProps } from "@/types/product";
import { calculateFinalPrise, calculatePriceByCard } from "@/utils/calcPrices";
import { useCallback } from "react";

interface UsePricingProps {
  avilebleCartItems: Array<{
    productId: string;
    quantity: number;
  }>;
  productsData: {
    [key: string]: ProductCardProps;
  };
  hasLoyaltyCard: boolean;
  bonusesCount: number;
  useBonuses: boolean;
}

export const usePricing = ({
  avilebleCartItems,
  productsData,
  hasLoyaltyCard,
  bonusesCount,
  useBonuses,
}: UsePricingProps) => {
  const totalPrice = avilebleCartItems.reduce((total, item) => {
    const product = productsData[item.productId];
    if (!product) return total;

    const priceWithDiscount = calculateFinalPrise(
      product.basePrice,
      product.discountPercent || 0,
    );

    const finalPrice = hasLoyaltyCard
      ? calculatePriceByCard(priceWithDiscount, CONFIG.CARD_DISCOUNT_PERCENT)
      : priceWithDiscount;

    return total + finalPrice * item.quantity;
  }, 0);

  const totalMaxPrice = avilebleCartItems.reduce((total, item) => {
    const product = productsData[item.productId];
    if (!product) return total;

    const priceWithDiscount = calculateFinalPrise(
      product.basePrice,
      product.discountPercent || 0,
    );

    return total + priceWithDiscount * item.quantity;
  }, 0);

  const totalDiscount = avilebleCartItems.reduce((total, item) => {
    const product = productsData[item.productId];
    if (!product) return total;

    const priceWithDiscount = calculateFinalPrise(
      product.basePrice,
      product.discountPercent || 0,
    );

    const finalPrice = hasLoyaltyCard
      ? calculatePriceByCard(priceWithDiscount, CONFIG.CARD_DISCOUNT_PERCENT)
      : priceWithDiscount;

    const itemDiscount = (priceWithDiscount - finalPrice) * item.quantity;

    return total + itemDiscount;
  }, 0);

  const maxBonusUse = Math.min(
    bonusesCount,
    Math.floor((totalPrice * CONFIG.MAX_BOUSES_PERCENT) / 100),
  );

  const finalPrice = useBonuses
    ? Math.max(0, totalPrice - maxBonusUse)
    : totalPrice;

  const totalBonuses = useCallback(
    () =>
      avilebleCartItems.reduce((total, item) => {
        const product = productsData[item.productId];
        if (!product) return total;

        const priceWithDiscount = calculateFinalPrise(
          product.basePrice,
          product.discountPercent || 0,
        );

        const bonuses = Math.round(
          priceWithDiscount * (CONFIG.BONUSES_PERCENT / 100),
        );
        return total + bonuses * item.quantity;
      }, 0),
    [avilebleCartItems, productsData],
  );

  const isMinimumReached = finalPrice >= 1000;

  return {
    totalPrice,
    totalMaxPrice,
    totalDiscount,
    finalPrice,
    maxBonusUse,
    totalBonuses: totalBonuses(),
    isMinimumReached,
  };
};
