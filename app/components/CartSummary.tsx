import { useCartStore } from "@/store/cartStore";
import { CONFIG } from "@/config/config";
import { ExtandedCartSummaryPros } from "@/types/cart";
import { useState } from "react";
import PriceSummary from "../(cart)/cart/_components/PriceSummary";
import MinimumOrderWarning from "../(cart)/cart/_components/MinimumOrderWarning";
import CheckoutButton from "../(cart)/cart/_components/CheckoutButton";
import PaymentButtons from "../(cart)/cart/_components/PaymentButtons";
import { FakePaymentData, PaymentSuccessData } from "@/types/payment";
import {
  clearUserCart,
  createOrderRequest,
  markPaymentAsFailed,
  prepareCartItemsWithPrices,
  updateUserAfterPayment,
} from "../(cart)/cart/utils/orderHelpers";
import FakePaymentModal from "@/app/(payment)/FakePaymentModal";
import PaymentSuccessModal from "@/app/(payment)/PaymentSuccessModal";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { ProductCardProps } from "@/types/product";

const CartSummary = ({
  deliveryData,
  productsData = {},
  isRepeatOrder = false,
  customCartItems,
  customPricing,
  onOrderSuccess
}: ExtandedCartSummaryPros) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<
    "online" | "cash_on_delivery" | null
  >(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [successData, setSuccessData] = useState<PaymentSuccessData | null>(
    null,
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();
  const actualHasLoyaltyCard = !!user?.card;
  const {
    pricing,
    cartItems,
    hasLoyaltyCard,
    isOrdered,
    setIsOrdered,
    isCheckout,
    setIsCheckout,
    useBonuses,
    resetAfterOrder,
    updatePricing
  } = useCartStore();
  const visibleCartItems =
    isRepeatOrder && customCartItems
      ? customCartItems
      : cartItems.filter((item) => item.quantity > 0);

      const currentPricing = isRepeatOrder && customPricing ? customPricing : pricing;

  const {
    totalPrice,
    totalMaxPrice,
    totalDiscount,
    finalPrice,
    totalBonuses,
    maxBonusUse,
    isMinimumReached,
  } = currentPricing;

  const usedBonuses = Math.min(
    maxBonusUse,
    Math.floor((totalPrice * CONFIG.MAX_BOUSES_PERCENT) / 100),
  );

  const actualUsedBonuses = useBonuses ? usedBonuses : 0;

  const createOrder = async (
    paymentMethod: "cash_on_delivery" | "online",
    paymentId?: string,
  ) => {
    if (!deliveryData) {
      throw new Error("Delivery data not filled");
    }

    if(isRepeatOrder){
      updatePricing({
        ...currentPricing,
        totalBonuses
      })
    }

    const effectiveHasLoyaltyCard = isRepeatOrder
      ? actualHasLoyaltyCard
      : hasLoyaltyCard;

    const cartItemsWithPrices = prepareCartItemsWithPrices(
      visibleCartItems,
      productsData as { [key: string]: ProductCardProps },
      effectiveHasLoyaltyCard,
    );

    const orderData = {
      finalPrice,
      totalBonuses,
      usedBonuses: actualUsedBonuses,
      totalDiscount,
      deliveryAddress: deliveryData.address,
      deliveryTime: deliveryData.time,
      cartItems: cartItemsWithPrices,
      totalPrice: totalMaxPrice,
      paymentMethod,
      paymentId,
    };

    return await createOrderRequest(orderData);
  };

  const handlePaymentResult = async (
    paymentMethod: "cash_on_delivery" | "online",
    paymentData?: FakePaymentData,
  ) => {
    if (!deliveryData) {
      console.error("Delivery data not filled");
      return;
    }

    setIsProcessing(true);
    setPaymentType(paymentMethod === "online" ? "online" : "cash_on_delivery");

    try {
      // const result = await createOrder(paymentMethod, paymentData?.id);

      if (paymentMethod === "online") {
        if (paymentData?.status === "succeeded") {
          await updateUserAfterPayment({
            orderId: currentOrderId!,
            usedBonuses: actualUsedBonuses,
            earnedBonuses: totalBonuses,
            purchasedProductsIds: visibleCartItems.map((item) => item.productId),
          });
        }
        //   try {
        //     await updateUserAfterPayment({
        //       usedBonuses: actualUsedBonuses,
        //       earnedBonuses: totalBonuses,
        //       purchasedProductIds: visibleCartItems.map((item) => item.productId),
        //     });
        //   } catch (updateError) {
        //     console.error(
        //       "Order is created but bonuses are not updated",
        //       updateError,
        //     );
        // }

        const successModalData: PaymentSuccessData = {
          orderNumber: orderNumber!,
          paymentId: paymentData!.id,
          amount: finalPrice,
          cardLast4: paymentData!.cardLast4,
        };
        setSuccessData(successModalData);
        setShowSuccessModal(true);
        setIsOrdered(true);

        await clearUserCart();
      } else {
        const result = await createOrder(paymentMethod, paymentData?.id);
        await clearUserCart();
        setOrderNumber(result.orderNumber);
        setIsOrdered(true);
      }

      setIsOrdered(true);
    } catch (error) {
      console.error(`Error`, error);
      alert(`Error in creating order`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCashPayment = async () => {
    await handlePaymentResult("cash_on_delivery");
  };

  const handleOnlinePayment = async () => {
    if (!deliveryData) {
      console.error("Delivery data not found");
      return;
    }
    setIsProcessing(true);
    try {
  
    
        const result = await createOrder("online");
        setOrderNumber(result.orderNumber);
        setCurrentOrderId(result.order._id);
        setShowPaymentModal(true);
      
    } catch (error) {
      console.error("Error in creating online order:", error);
      alert("Error in creating online order");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handlePaymentSuccess = async (paymentData: FakePaymentData) => {
    setShowPaymentModal(false);
    try {
      await handlePaymentResult("online", paymentData);
    } catch (error) {
      console.error("Error in creating online order:", error);
    }
  };

  const handlePaymentError = async(error: string) => {
    setShowPaymentModal(false);
    if(currentOrderId){
      await markPaymentAsFailed(currentOrderId);
    }else{
      console.error(`Payment error, orderId not found for marking as failed: ${error}`);
    }
    alert(`Payment error: ${error}`);
    resetAfterOrder();
    await clearUserCart();
    router.push("/user-orders");
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    if(isRepeatOrder && onOrderSuccess){
      onOrderSuccess();
    }
    setIsOrdered(true);
    resetAfterOrder();
    router.push("/user-orders");
  };

  const isFormValid = (): boolean => {
    if (!deliveryData) {
      return false;
    }
    const { address, time } = deliveryData;

    const isAddressValid = Boolean(
      address.city?.trim() && address.street?.trim() && address.house?.trim(),
    );

    const isTimeValid = Boolean(time.date?.trim() && time.timeSlot?.trim());

    const isValidForm =
      isAddressValid &&
      isTimeValid &&
      isMinimumReached &&
      visibleCartItems.length > 0;

    return isValidForm;
  };

  const canProceedWithPayment = (): boolean => {
    return isFormValid() && !isProcessing;
  };

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

        { isRepeatOrder || isCheckout ? (
          <PaymentButtons
            isOrdered={isOrdered}
            paymentType={paymentType}
            orderNumber={orderNumber}
            isProcessing={isProcessing}
            canProceedWithPayment={canProceedWithPayment()}
            onOnlinePayment={handleOnlinePayment}
            onCashPayment={handleCashPayment}
          />
        ) : (
          <CheckoutButton
            visibleCartItems={visibleCartItems}
            isMinimumReached={isMinimumReached}
            onCheckout={() => setIsCheckout(true)}
            isCheckout={isCheckout}
          />
        )}
      </div>
      <FakePaymentModal
        amount={finalPrice}
        isOpen={showPaymentModal}
        onClose={handleClosePaymentModal}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        successData={successData}
      />
    </>
  );
};

export default CartSummary;
