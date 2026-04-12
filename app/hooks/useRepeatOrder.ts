import { DeliveryData } from "@/types/cart";
import { DeliveryAdress } from "@/types/order";
import { useState } from "react";

export const useRepeatOrder = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDeliveryButton, setShowDeliveryButton] = useState(false);
  const [isRepeatOrderCreated, setIsRepeatOrderCreated] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryData | null>(
    null,
  );

  const handleOrderClick = () => setShowDeliveryButton(true);
  const handleDeliveryClick = () => setShowDatePicker(true);
  const handleDateSelect = (
    date: Date,
    timeSlot: string,
    address: DeliveryAdress,
  ) => {
    const deliveryData: DeliveryData = {
      address,
      time: { date: date.toISOString().split("T")[0], timeSlot },
      isValid: false
    };
    setSelectedDelivery(deliveryData);
    setShowDatePicker(false);
  };

  const handleCancelDelivery = () => {
    setSelectedDelivery(null);
    setShowDatePicker(false);
    setShowDeliveryButton(false);
  };

  const handleEditDelivery = () => {
    setShowDatePicker(true);
  };

  const handleRepeatOrderSuccess = () =>{
    setIsRepeatOrderCreated(true);
    setSelectedDelivery(null);
    setShowDeliveryButton(false);
    
  }

  return {
    showDatePicker,
    handleOrderClick,
    handleDeliveryClick,
    showDeliveryButton,
    handleDateSelect,
    selectedDelivery,
    setSelectedDelivery,
    handleCancelDelivery,
    isRepeatOrderCreated,
    setIsRepeatOrderCreated,
    handleEditDelivery,
    handleRepeatOrderSuccess
  };
};
