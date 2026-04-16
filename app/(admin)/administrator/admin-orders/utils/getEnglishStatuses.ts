import { Order } from "@/types/order";

export const getEnglishStatuses = (russianStatus: string, order: Order): { status: string; paymentStatus?: string } => {
  // Для онлайн оплаты
  if (order.paymentMethod === "online") {
    switch (russianStatus) {
      case "Confirmed":
        return { status: "confirmed", paymentStatus: "paid" };
      case "Not Confirmed":
        return { status: "cancelled", paymentStatus: "failed" };
      case "New":
        return { status: "pending", paymentStatus: "waiting" }; 
    }
  }

  // Для оплаты при доставке
  if (order.paymentMethod === "cash_on_delivery") {
    switch (russianStatus) {
      case "Confirmed":
        return { status: "confirmed", paymentStatus: "pending" };
      case "New":
        return { status: "pending", paymentStatus: "pending" }; 
    }
  }

  // Базовые статусы (не влияют на paymentStatus)
  const statusMap: { [key: string]: string } = {
    "New": "pending",
    "Collected": "collected",
    "Delivering": "delivering",
    "Confirmed": "confirmed",
    'Not Confirmed': 'cancelled',
    "Refund": "refund", 
    "Returned": "returned",
    "Delivered": "delivered",
    // "Cancelled": "cancelled",
  };

  return { status: statusMap[russianStatus] || "pending" };
};