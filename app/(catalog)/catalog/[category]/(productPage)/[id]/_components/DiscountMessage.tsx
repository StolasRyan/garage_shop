"use client";

import { useAuthStore } from "@/store/authStore";
import { Bell, BellOff } from "lucide-react";
import { useEffect, useState } from "react";
import PriceAlertModal from "./PriceAlertModal";
import { unsubscribePriceAlert } from "@/actions/priceAlerts";

interface DiscountMessageProps {
  productId: string;
  productTitle: string;
  currentPrice: string;
  initialIsSubsctibed?: boolean;
  unsubscribeToken?: string;
}

const DiscountMessage = ({
  productId,
  productTitle,
  currentPrice,
  initialIsSubsctibed = false,
  unsubscribeToken: initialUnsubsctibeToken,
}: DiscountMessageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(initialIsSubsctibed);
  const [notification, setNotification] = useState("");
  const [unsubscribeToken, setUnsubscribeToken] = useState(
    initialUnsubsctibeToken || "",
  );
  const { isAuth } = useAuthStore();

  useEffect(()=>{
    if(notification){
        const timer = setTimeout(()=>{
            setNotification('')
        }, 3000);

        return ()=> clearTimeout(timer)
    }
  },[notification])

  const handleOpenModal = () => {
    if (!isAuth) {
      setNotification("Subscribe allowed for registered users only");
      return;
    }

    if (isSubscribed) {
      setNotification("You are alredy subscribed on this product changes");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubscribeSuccess = (token: string) => {
    setIsSubscribed(true);
    setUnsubscribeToken(token);
    setNotification("You are subscribed succesfully!");
  };

  const handleUnsibscribe = async () => {
    if (!unsubscribeToken) return;

    setIsLoading(true);

    try {
      const result = await unsubscribePriceAlert(unsubscribeToken);

      if (result.success) {
        setIsSubscribed(false);
        setNotification("You are unsubsribed from notifications");
      } else if (result.error) {
        setNotification(result.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-primary text-white px-6 py-3 rounded shadow-md">
            {notification}
          </div>
        </div>
      )}
      {isSubscribed ? (
        <button
          onClick={handleUnsibscribe}
          disabled={isLoading}
          className="flex flex-row items-center gap-2 p-2 mb-6 text-[#606060] rounded text-xs hover:bg-gray-200 mx-auto duration-300 cursor-pointer"
        >
          <BellOff className="w-4 h-4"/>
          {isLoading ? "Unsubscribing..." : "Unsubscribe from notifications"}
        </button>
      ) : (
        <button
          onClick={handleOpenModal}
          className="flex flex-row items-center gap-2 p-2 mb-6 text-[#606060] rounded text-xs hover:bg-gray-200 mx-auto duration-300 cursor-pointer"
        >
          <Bell className="w-4 h-4"/>
          Notify about lower price
        </button>
      )}
      {isModalOpen && (
        <PriceAlertModal
          onCloseAction={handleCloseModal}
          productId={productId}
          productTitle={productTitle}
          currentPrice={currentPrice}
          onSuccessAction={handleSubscribeSuccess}
        />
      )}
    </>
  );
};

export default DiscountMessage;
