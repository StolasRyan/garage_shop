import { CONFIG } from "@/config/config";
import { CartItem } from "@/types/cart";
import { CartItemWithPrice, CreateOrderRequest } from "@/types/order";
import { ProductCardProps } from "@/types/product";
import { calculateFinalPrice, calculatePriceByCard } from "@/utils/calcPrices";

export const prepareCartItemsWithPrices = (
  cartItems: CartItem[],
  productsData: Record<string, ProductCardProps>,
  hasLoyaltyCard: boolean,
): CartItemWithPrice[] => {
  return cartItems
    .map((item) => {
      const product = productsData[item.productId];

      if (!product) {
        console.warn(`Product with id ${item.productId} not found`);
        return null;
      }

      const priceWithDiscount = calculateFinalPrice(
        product.basePrice,
        product.discountPercent || 0,
      );

      const finalPrice = hasLoyaltyCard
        ? calculatePriceByCard(priceWithDiscount, CONFIG.CARD_DISCOUNT_PERCENT)
        : priceWithDiscount;

      return {
        ...item,
        price: finalPrice,
        basePrice: product.basePrice,
        discountPercent: product.discountPercent,
        hasLoyaltyDiscount: hasLoyaltyCard,
      };
    })
    .filter(Boolean) as CartItemWithPrice[];
};

export const createOrderRequest = async (orderData: CreateOrderRequest) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create order");
  }

  return await response.json();
};

export const updateUserAfterPayment = async (data: {
  orderId: string;
  usedBonuses?: number;
  earnedBonuses?: number;
  purchasedProductsIds?: string[];
}) => {
  try {
    const response = await fetch("/api/orders/update-after-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update user", error);
    throw error;
  }
};

export const clearUserCart = async (): Promise<void> =>{
  try{
    const response = await fetch("/api/orders/clear-cart", {
      method: "POST"
    })

    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed while clearing cart")
    }

    const result = await response.json();

    if(!result.success){
      throw new Error(result.message || "Failed to clear cart")
    }

  }catch(e){
    console.error("Failed to clear cart", e);
    throw e
  }
};

export const updateOrderStatus = async (
  orderId: string,
  updates:{status?:string, paymentStatus?:string}
)=>{
  try {
    const response = await fetch(`/api/orders/update-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({orderId, ...updates})
    })
    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update order status")
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to update order status", error);
    throw error
  }
};

export const markPaymentAsFailed =async(orderId:string)=>{
  return await updateOrderStatus(orderId, {paymentStatus:"failed"})
};

export const confirmedOrderPayment = async(orderId:string)=>{
  return await updateOrderStatus(orderId, {status:"confirmed", paymentStatus:"paid"})
}