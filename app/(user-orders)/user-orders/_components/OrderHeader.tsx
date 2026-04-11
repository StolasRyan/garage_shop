import { OrderHeaderProps } from "@/types/order";
import { formatOrderDate } from "../utils/formatOrderDate";
import { getStatusColor } from "../utils/getStatusColor";
import { getStatusText } from "../utils/getStatusText";
import { formatPrice } from "@/utils/formatPrice";
import { Calendar } from "lucide-react";

const OrderHeader = ({
  order,
  showDeliveryButton,
  onOrderClick,
  onDeliveryClick,
  disabled = false
}: OrderHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center mb-10.5 gap-6">
      <div className="flex flex-col md:flex-row text-sm lg:text-2xl gap-2  lg:gap-6 items-center">
        <p className="font-bold">{formatOrderDate(order.deliveryDate)}</p>
        <p className="font-bold hidden lg:block">{order.deliveryTimeSlot}</p>
        <span
          className={`px-2 py-1 rounded text-xs md:text-base shrink-0 ${getStatusColor(order.status)}`}
        >
          {getStatusText(order.status)}
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-2 lg:gap-6 items-center">
        <p className="text-xl md:text-2xl">
          {formatPrice(order.totalAmount)} ₽
        </p>
        {!showDeliveryButton ? (
          <button
            onClick={onOrderClick}
            disabled={disabled}
            className={`w-50 h-10 rounded duration-300 ${
                disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                : 'bg-primary text-white hover:shadow-button-default cursor-pointer'
            }`}
          >
            {disabled ? 'Not available':'Make Order'}
          </button>
        ) : (
          <button
            onClick={onDeliveryClick}
            className="bg-lime-400 text-white flex justify-between items-center border-none rounded cursor-pointerduration-300 hover:shadow-button-default gap-2 p-2"
          >
            <Calendar size={20} />
            <p className="flex-1">Time of delivery</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderHeader;
