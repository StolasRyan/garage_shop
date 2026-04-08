import { buttonStyles } from "@/app/styles";
import { useCartStore } from "@/store/cartStore";
import { CONFIG } from "@/config/config";
import { CartSummaryProps } from "@/types/cart";
import { useState } from "react";
import { CartItemWithPrice } from "@/types/order";
import { calculateFinalPrice, calculatePriceByCard } from "@/utils/calcPrices";
import { createOrderAction } from "@/actions/orderDelivery";
import OrderSuccessMessage from "./OrderSuccessMessage";
import PriceSummary from "./PriceSummary";
import MinimumOrderWarning from "./MinimumOrderWarning";
import CheckoutButton from "./CheckoutButton";

const CartSummary = ({ deliveryData, productsData = {} }: CartSummaryProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState< "online" | "cash" | null >(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    pricing,
    cartItems,
    hasLoyaltyCard,
    isOrdered,
    setIsOrdered,
    isCheckout,
    setIsCheckout,
  } = useCartStore();
  const visibleCartItems = cartItems.filter((item) => item.quantity > 0);
  const {
    totalPrice,
    totalMaxPrice,
    totalDiscount,
    finalPrice,
    totalBonuses,
    maxBonusUse,
    isMinimumReached,
  } = pricing;
  const usedBonuses = Math.min(
    maxBonusUse,
    Math.floor((totalPrice * CONFIG.MAX_BOUSES_PERCENT) / 100),
  );

  const handleOnlinePayment = () => {
    if (!deliveryData) {
      console.error("Delivery data not found");
      return;
    }
    console.log("Online payment");
  };

  const handleCashPayment =async()=>{
    if(!deliveryData){
      console.error("Delivery data are not filled");
      return;
    }

    setIsProcessing(true);

    try {
      const cartItemsWithPrices:CartItemWithPrice[] = visibleCartItems.map(
      (item)=>{
        const product = productsData[item.productId];
        if(!product){
          return {
            productId: item.productId,
            quantity: item.quantity,
            price: 0,
          }
        }

        const priceWithDiscount = calculateFinalPrice(
          product.basePrice,
          product.discountPercent || 0,
        );

        const finalPrice = hasLoyaltyCard
          ? calculatePriceByCard(priceWithDiscount, CONFIG.CARD_DISCOUNT_PERCENT)
          : priceWithDiscount;

        return {
          productId: item.productId,
          quantity: item.quantity,
          price: finalPrice,
          basePrice: product.basePrice,
          discountPercent: product.discountPercent || 0,
          hasLoyaltyDiscount: hasLoyaltyCard
        }
      }
    )

    const result = await createOrderAction({
      finalPrice,
      totalBonuses,
      usedBonuses,
      totalDiscount,
      deliveryAddress: deliveryData.address,
      deliveryTime: deliveryData.time,
      cartItems: cartItemsWithPrices,
      totalPrice: totalMaxPrice,
      paymentMethod: 'cash_on_delivery'
    });

    setOrderNumber(result.orderNumber);
    setIsOrdered(true);
    } catch (error: unknown) {
      console.error("Error creating order", error);
      const errorMessage = 
      error instanceof Error ? error.message : "Unknown error";
      alert(`Error creating order: ${errorMessage}`);
    }finally{
      setIsProcessing(false);
    }
  }

  const isFormValid = ():boolean=>{
    if(!deliveryData){
      return false;
  }
  const {address, time} = deliveryData;

  const isAddressValid =Boolean(
    address.city?.trim() && address.street?.trim() && address.house?.trim()
  )

  const isTimeValid = Boolean(time.date?.trim() && time.timeSlot?.trim());

  const isValidForm = 
  isAddressValid &&
  isTimeValid &&
  isMinimumReached &&
  visibleCartItems.length > 0;

  return isValidForm
}

  const canProceedWithPayment = ():boolean=>{
    return isFormValid() && !isProcessing;
  }

  return (
    <>
      <PriceSummary
      visibleCartItems={visibleCartItems}
      totalMaxPrice={totalMaxPrice}
      totalDiscount={totalDiscount}
      finalPrice={finalPrice}
      totalBonuses={totalBonuses}
      />

      
        <div className="w-full">
          <MinimumOrderWarning isMinimumReached={isMinimumReached} />

          {!isCheckout ? (
            <CheckoutButton
            visibleCartItems={visibleCartItems}
            isMinimumReached={isMinimumReached}
            onCheckout={()=>setIsCheckout(true)}
            isCheckout={isCheckout}
            />
          ) : (
            <div className="flex flex-col gap-3">
              {!isOrdered ? (
                <>
                  <button
                    disabled={!canProceedWithPayment()}
                    className={`rounded w-full text-xl h-15 items-center justify-center duration-300 ${
                      canProceedWithPayment()
                        ? buttonStyles.active
                        : buttonStyles.inactive
                    }`}
                    onClick={handleOnlinePayment}
                  >
                    {isProcessing ? "Processing..." : "Pay online"}
                  </button>

                  <button
                    disabled={!canProceedWithPayment()}
                    onClick={handleCashPayment}
                    className={`h-10 rounded w-full text-base justify-center items-center duration-300 ${
                      canProceedWithPayment()
                        ? "bg-primary hover:shadow-button-default active:shadow-button-active text-white cursor-pointer"
                        : "bg-gray-300 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isProcessing ? "Processing..." : "Pay with cash"}
                  </button>
                </>
              ) : (
                <OrderSuccessMessage orderNumber={orderNumber} />
              )}
            </div>
          )}
        </div>
    </>
  );
};

export default CartSummary;
