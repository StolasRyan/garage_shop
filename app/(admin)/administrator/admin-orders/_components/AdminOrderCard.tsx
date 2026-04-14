import { Order } from "@/types/order";
import UserAvatar from "./UserAvatar";
import { Eye, EyeOff, PhoneIcon } from "lucide-react";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";
import StatusDropDown from "./StatusDropDown";
import { useState } from "react";
import { getMappedStatus } from "../utils/getMappedStatus";
import { getEnglishStatuses } from "../utils/getEnglishStatuses";
import { updateOrderStatus } from "@/app/(cart)/cart/utils/orderHelpers";

const AdminOrderCard = ({
  order,
  onStatusUpdate,
}: {
  order: Order;
  onStatusUpdate?: (orderId: string, newStatus: string) => void;
}) => {
  const [currentStatusLabel, setCurrentStatusLabel] = useState<string>(
    getMappedStatus(order),
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const handleStatusChange = async (newStatusLabel: string) => {
    setIsUpdating(true);
    try {
      const { status: englishStatus, paymentStatus } = getEnglishStatuses(
        newStatusLabel,
        order,
      );

      const updateData: { status: string; paymentStatus?: string } = {
        status: englishStatus,
      };

      if (paymentStatus !== undefined) {
        updateData.paymentStatus = paymentStatus;
      }

      await updateOrderStatus(order._id, updateData);
      setCurrentStatusLabel(newStatusLabel);

      if (onStatusUpdate) {
        onStatusUpdate(order._id, englishStatus);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToogleDetails = () => {
    setShowOrderDetails(!showOrderDetails);
  };

  return (
    <>
      <div className="flex flex-1 flex-wrap justify-between items-start text-gray-600 gap-20">
        <div className="flex gap-x-4 items-center">
          <h2 className="text-base md:text-lg lg:text-2xl font-bold">
            {order.orderNumber.slice(-3)}
          </h2>
          <div className="flex items-center gap-x-2">
            <UserAvatar
              userId={order.userId}
              gender={order.gender}
              name={order.name}
            />
            <span className="text-base md:text-lg">{order.name}</span>
          </div>
          
        </div>
        <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2">
              <PhoneIcon size={24} />
              <span className="underline">
                {formatPhoneNumber(order.phone)}
              </span>
            </div>
            <StatusDropDown
              currentStatusLabel={currentStatusLabel}
              isUpdating={isUpdating}
              onStatusChange={handleStatusChange}
            />
            <button
              className="bg-gray-100 hover:shadow-button-secondary w-50 h-10 px-2 flex justify-center items-center gap-2 rounded duration-300 cursor-pointer"
              onClick={handleToogleDetails}
            >
              {showOrderDetails ? (<span className="flex items-center justify-center"><EyeOff size={24}/><p> Hide order</p></span>) : (<span className="flex items-center justify-center"><Eye size={24}/><p> Show order</p></span>)}
            </button>
          </div>
      </div>
    </>
  );
};

export default AdminOrderCard;
