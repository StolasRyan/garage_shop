import { Order } from "@/types/order";

export function getPaymentStatusText (paumentStatus: Order['paymentStatus']):string{
switch (paumentStatus) {
    case "pending":
        return "Waiting for payment";
    case "waiting":
        return "Waiting for confirmation";
    case "paid":
        return "Paid";
    case "failed":
        return "Payment error";
    default:
        return paumentStatus;
  }
}