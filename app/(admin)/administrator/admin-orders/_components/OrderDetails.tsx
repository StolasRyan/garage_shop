import { Order } from "@/types/order";
import { isBirthdaySoon } from "@/utils/admin/isBirthdaySoon";
import { Building2Icon, Cake, ClockIcon, CoinsIcon, PhoneIcon, WeightTilde } from "lucide-react";
import { getMappedStatus } from "../utils/getMappedStatus";


interface OrderDetailsProps { 
    order: Order;
    totalWeight?: number;
}

const OrderDetails = ({order, totalWeight = 0}: OrderDetailsProps) => {

    const formatDate = (isoString: string): string => {
        if(!isoString) return ''
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    const formatDateTime = (isoString: string): string => {
        if(!isoString) return ''
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    const formattedCreatedAt = formatDateTime(order.createdAt);
    const formattedDeliveryDate = formatDate(order.deliveryDate);
    const formattedBirthday = formatDate(order.birthday);
    const birthdaySoon = isBirthdaySoon(order.birthday);
  return (
     <div className="text-main-text p-5 mt-10 space-y-6">
      <h3 className="text-lg font-bold text-main-text mb-4">
        Order details #{order.orderNumber}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Order details</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium">{getMappedStatus(order)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment method:</span>
              <span className="font-medium">
                {order.paymentMethod === "cash_on_delivery"
                  ? "Наложенный платёж"
                  : order.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment status:</span>
              <span className="font-medium">{getMappedStatus(order)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Created at:</span>
              <span className="font-medium">{formattedCreatedAt}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 border-l-2 border-gray-200 pl-6">
          <h4 className="font-medium text-gray-700">Finance information</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 font-bold">Total amount:</span>
              <span className="font-medium">{order.totalAmount} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount:</span>
              <span className="font-medium text-green-600">
                -{order.discountAmount} ₽
              </span>
            </div>
            <div className="flex justify-between">
                
              <span className="text-gray-600">Used bonuses:</span>
              <span className="font-medium">{order.usedBonuses}</span>
            </div>
            <div className="flex justify-between">
                
              <span className="text-gray-600 flex items-center gap-2"><CoinsIcon size={20}/> Bonuses earned:</span>
              <span className="font-medium text-green-600">
                +{order.earnedBonuses}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 border-l-2 border-gray-200 pl-6">
          <h4 className="font-medium text-gray-700">Delivery details</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
                
              <span className="text-gray-600 flex items-center gap-2"><Building2Icon size={20}/> City:</span>
              <span className="font-medium">{order.deliveryAddress?.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-medium">
                ул. {order.deliveryAddress?.street}, д.{" "}
                {order.deliveryAddress?.house}
                {order.deliveryAddress?.apartment &&
                  `, кв. ${order.deliveryAddress.apartment}`}
              </span>
            </div>
            {order.deliveryAddress?.additional && (
              <div className="flex justify-between">
                <span className="text-gray-600">Additional:</span>
                <span className="font-medium">
                  {order.deliveryAddress?.additional}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery date:</span>
              <span className="font-medium">{formattedDeliveryDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 flex items-center gap-2"><ClockIcon size={18}/>Delivery Time:</span>
              <span className="font-medium">{order.deliveryTimeSlot}</span>
            </div>
          </div>
        </div>
        <div className="space-y-3 md:col-span-2 lg:col-span-3">
          <h4 className="font-medium text-gray-700">Users information</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <span className="text-gray-600 text-sm">Name:</span>
              <p className="font-medium">
                {order.name} {order.surname}
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm flex items-center gap-2"><PhoneIcon size={15}/> Phone:</span>
              <p className="font-medium">+{order.phone}</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Gender:</span>
              <p className="font-medium">
                {order.gender === "male"
                  ? "Male"
                  : order.gender === "female"
                    ? "Female"
                    : order.gender}
              </p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Birthday Day:</span>
              <div className="flex items-center">
                <p
                  className={`${birthdaySoon ? "text-red-500" : ""} font-medium`}
                >
                  {formattedBirthday}
                </p>
                {birthdaySoon && (
                  <Cake className="ml-2 text-yellow-500" size={20} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-700 mb-4">
          <span className="text-gray-600 ml-4 flex items-center justify-center gap-2">
            <WeightTilde size={20}/>
            <p>Total weight: {totalWeight.toFixed(2)} кг</p>
          </span>
        </h4>
      </div>
    </div>
  );
};
  
export default OrderDetails