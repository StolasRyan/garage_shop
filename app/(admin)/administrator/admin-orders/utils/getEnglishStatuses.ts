import { Order } from "@/types/order";

export const getEnglishStatuses = (russianStatus: string, order: Order): { status: string; paymentStatus?: string } => {
  // Для онлайн оплаты
  if (order.paymentMethod === "online") {
    switch (russianStatus) {
      case "Confirmed":
        return { status: "confirmed", paymentStatus: "paid" };
      case "Not Confirmed":
        return { status: "pending", paymentStatus: "failed" };
      case "New":
        return { status: "pending", paymentStatus: "waiting" }; 
      case "Not Payed":
        return { status: "pending", paymentStatus: "failed" };
    }
  }

  // Для оплаты при доставке
  if (order.paymentMethod === "cash_on_delivery") {
    switch (russianStatus) {
      case "Delivering":
        return { status: "pending", paymentStatus: "pending" }; 
      case "Confirmed":
        return { status: "confirmed", paymentStatus: "pending" };
      case "New":
        return { status: "pending", paymentStatus: "pending" }; 
    }
  }

  // Базовые статусы (не влияют на paymentStatus)
  const statusMap: { [key: string]: string } = {
    "In process": "pending",
    "Refund": "refund", 
    "Returned": "returned",
    "Collected": "collected",
    "Delivering": "delivering",
    "Confirmed": "confirmed",
    "Delivered": "delivered",
    "Cancelled": "cancelled",
  };

  return { status: statusMap[russianStatus] || "pending" };
};