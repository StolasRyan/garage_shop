import UserAvatar from "./UserAvatar";
import {
  CalendarIcon,
  Eye,
  EyeOff,
  MessageSquare,
  MessageSquareText,
  PhoneIcon,
  UploadIcon,
} from "lucide-react";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";
import StatusDropDown from "./StatusDropDown";
import { useEffect, useState } from "react";
import { getMappedStatus } from "../utils/getMappedStatus";
import { getEnglishStatuses } from "../utils/getEnglishStatuses";
import { updateOrderStatus } from "@/app/(cart)/cart/utils/orderHelpers";
import { useGetAdminOrdersQuery } from "@/store/redux/api/ordersApi";
import {
  useGetOrderMessagesQuery,
  useHasUnreadMessagesQuery,
} from "@/store/redux/api/chatApi";
import IconNotice from "./IconNotice";
import OrderChatModal from "./OrderChatModal";
import CalendarOrderModal from "./CalendarOrderModal";
import { buttonStyles } from "@/app/styles";
import OrderProductsLoader from "./OrderProductsLoader";
import OrderDetails from "./OrderDetails";
import { exportOrderToExel } from "../utils/exportOrderToExel";

const AdminOrderCard = ({ orderId }: { orderId: string }) => {
  const { data } = useGetAdminOrdersQuery();
  const order = data?.orders?.find((order) => order._id === orderId);
  const [currentStatusLabel, setCurrentStatusLabel] = useState<string>(
    order ? getMappedStatus(order) : "",
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showFullOrder, setShowFullOrder] = useState(false);
  const [totalOrderWeight, setTotalOrderWeight] = useState<number>(0);
  const [isExporting, setIsExporting] = useState(false);

  const { data: messages = [] } = useGetOrderMessagesQuery(orderId);
  const { data: { hasUnread = false, unreadMessagesCount = 0 } = {} } =
    useHasUnreadMessagesQuery(orderId, {
      pollingInterval: 2000,
    });

  const showCalendarIcon =
    order && (order.status === "pending" || order.status === "confirmed");

  useEffect(() => {
    if (order) {
      setCurrentStatusLabel(getMappedStatus(order));
    }
  }, [order]);

  const formattedPhone = order ? formatPhoneNumber(order.phone) : "";

  const handleStatusChange = async (newStatusLabel: string) => {
    if (!order) return;
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
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToogleDetails = () => {
    if (!showOrderDetails) {
      setShowOrderDetails(true);
      setShowFullOrder(false);
    } else {
      setShowOrderDetails(false);
      setShowFullOrder(false);
    }
  };

  const handleToggleFullOrder = () => {
    if (showFullOrder) {
      setShowOrderDetails(false);
      setShowFullOrder(false);
    } else {
      setShowFullOrder(true);
    }
  };

  const handleOpenChat = () => {
    fetch(`/api/admin/chat/${orderId}/read`, {
      method: "POST",
    });
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  const handleOpenCalendar = () => {
    if (showCalendarIcon) {
      setShowCalendar(true);
    }
  };

  const handleCloseCalendar = () => {
    if (showCalendarIcon) {
      setShowCalendar(false);
    }
  };

  const handleTotalWeightCalculated = (weight: number) => {
    setTotalOrderWeight(weight);
  }

  const handleExportToExel = async() => {
    if(!order || isExporting) return;

    setIsExporting(true);
    try {
      await exportOrderToExel(order);
    } catch (error) {
      console.error('Error exporting to exel', error);
    }finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 flex-wrap justify-between items-start text-gray-600 gap-x-20">
        <div className="flex gap-x-4 items-center">
          <h2 className="text-base md:text-lg lg:text-2xl font-bold">
            {order?.orderNumber.slice(-3)}
          </h2>
          <div className="flex items-center gap-x-2">
            <UserAvatar
              userId={order?.userId}
              gender={order?.gender}
              name={order?.name}
            />
            <span className="text-base md:text-lg">{order?.name}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2">
            <PhoneIcon size={24} />
            <span className="underline">{formattedPhone}</span>
          </div>
          <StatusDropDown
            currentStatusLabel={currentStatusLabel}
            isUpdating={isUpdating}
            onStatusChange={handleStatusChange}
          />
          {!showOrderDetails && (
            <button
              className="bg-gray-100 hover:shadow-button-secondary w-50 h-10 px-2 flex justify-center items-center gap-2 rounded duration-300 cursor-pointer"
              onClick={handleToogleDetails}
            >
              <span className="flex items-center justify-center">
                <Eye size={24} />
                <p> Show order</p>
              </span>
            </button>
          )}

          {showOrderDetails && (
            <button
              className={`${buttonStyles.active} hover:shadow-gray-900/10 w-50 h-10 px-2 flex justify-center items-center gap-2 rounded duration-300 cursor-pointer`}
              disabled={!order || isExporting}
              onClick={handleExportToExel}
            >
              <UploadIcon size={24} />
              <p>Export to Excel</p>
            </button>
          )}

          {showCalendarIcon ? (
            <div>
              <button
                className="relative bg-gray-200 hover:shadow-button-default w-10 h-10 flex justify-center items-center gap-2 rounded duration-300 cursor-pointer"
                onClick={handleOpenCalendar}
              >
                <CalendarIcon size={24} />
              </button>
              <CalendarOrderModal
                orderId={orderId}
                isOpen={showCalendar}
                onClose={handleCloseCalendar}
              />
            </div>
          ) : (
            <button
              className="relative bg-gray-200 hover:shadow-button-default w-10 h-10 flex justify-center items-center gap-2 rounded duration-300 cursor-pointer"
              onClick={handleOpenChat}
            >
              {messages.length === 0 ? (
                <MessageSquare size={24} />
              ) : (
                <MessageSquareText size={24} />
              )}
              {hasUnread && (
                <IconNotice unreadMessagesCount={unreadMessagesCount} />
              )}
            </button>
          )}
        </div>
      </div>
      {showOrderDetails && (
        <>
          <OrderProductsLoader
          orderItems={order?.items || []}
          onTotalWeightCalculated={handleTotalWeightCalculated}
          applyIndexStyles={!showFullOrder}
          showFullOrder={showFullOrder}
          />
        {showFullOrder && (<OrderDetails order={order!} totalWeight={totalOrderWeight}/> )}
        </>
      )}
      {showOrderDetails && !showFullOrder && (
        <div className="flex items-center justify-center mt-10">
          <button
            className="bg-gray-100 hover:shadow-button-secondary w-60 h-10 px-2 flex justify-center items-center gap-2 rounded duration-300 cursor-pointer"
            onClick={handleToggleFullOrder}
          >
            <span className="flex items-center justify-center gap-2">
              <Eye size={24} />
              <p> Show order</p>
            </span>
          </button>
        </div>
      )}
      {showFullOrder && (
        <div className="flex items-center justify-center mt-10">
          <button
            className="bg-gray-100 hover:shadow-button-secondary w-60 h-10 px-2 flex justify-center items-center gap-2 rounded duration-300 cursor-pointer"
            onClick={handleToggleFullOrder}
          >
            <span className="flex items-center justify-center gap-2">
              <EyeOff size={24} />
              <p>Hide</p>
            </span>
          </button>
        </div>
      )}
      <OrderChatModal
        orderId={orderId}
        isOpen={showChat}
        onClose={handleCloseChat}
      />
    </div>
  );
};

export default AdminOrderCard;
