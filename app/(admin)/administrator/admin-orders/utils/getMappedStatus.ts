import { Order } from "@/types/order";
import { CUSTOMER_STATUSES } from "./customerStatuses";

export const getMappedStatus = (order: Order): string => {
  // 1. Сначала проверяем особые случаи с оплатой
  if (order.paymentMethod === "online") {
    if (order.paymentStatus === "paid" && order.status === "confirmed") {
      return "Confirmed";
    } else if (order.paymentStatus === "failed") {
      return "Not Confirmed";
    } else if (order.paymentStatus === "waiting" && order.status === "pending") {
      return "New";
    }
  }
 
  if (order.paymentMethod === "cash_on_delivery") {
    if (order.status === "pending" && order.paymentStatus === "pending") {
      return "Delivering";
    } else if (order.status === "confirmed") {
      return "Confirmed";
    }
  }
 
  // 2. Затем проверяем CUSTOMER_STATUSES
  const statusFromValue = CUSTOMER_STATUSES.find(status => status.value === order.status);
  if (statusFromValue) {
    return statusFromValue.label;
  }
 
  // 3. Fallback
  return "New";
};