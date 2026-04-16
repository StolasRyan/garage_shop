import { Order } from "@/types/order";
import { Check, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { getUniqueCities } from "../utils/getUniqueCities";
import CityFilterButtons from "./CityFilterButtons";
import AdminOrderCard from "./AdminOrderCard";
import { useGetAdminOrdersQuery } from "@/store/redux/api/ordersApi";

interface TimeSlotGroupProps {
  orderIds: string[];
  timeSlot: string;
}

const TimeSlotGroup = ({ orderIds, timeSlot }: TimeSlotGroupProps) => {
  const { data } = useGetAdminOrdersQuery();
  const [selectedCity, setSelectedCity] = useState<string>("All cities");
  const [localOrders, setLocalOrders] = useState<Order[]>([]);

  useEffect(() => {
    if(data?.orders){
      const filteredOrders = data.orders.filter(
        (order)=>orderIds.includes(order._id)
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalOrders(filteredOrders);
    }
  }, [data?.orders, orderIds]);

  const cities = getUniqueCities(localOrders);

  const filteredSlotOrders =
    selectedCity === "All cities"
      ? localOrders
      : localOrders.filter(
          (order) => order.deliveryAddress?.city === selectedCity,
        );

        const completedOrders = filteredSlotOrders.filter(
            (order) => order.status === 'confirmed'
        );


        const checked = filteredSlotOrders.length === completedOrders.length

  const startTime = timeSlot.split("-")[0];

  const handleCitySelect = (city: string) => {
      setSelectedCity(city);
  }

  const handleOrderStatusUpdate = (orderId: string, newStatus: string)=>{
    setLocalOrders((prev)=> prev.map((order)=>{
        if(order._id === orderId){
            const updatedOrder:Order = {
                ...order,
                status: newStatus as Order['status']
            }
            return updatedOrder; 
        }
        return order;
    }))
  }



  return (
    <div key={timeSlot}>
      <div className="flex justify-between text-xl md:text-2xl lg:text-4xl text-gray-600">
        <div className="flex items-center gap-x-4 mb-4">
          <Clock size={24} />
          <span className="font-bold">{startTime}</span>
        </div>
        <div className="flex gap-2.5 items-center">
            <Check size={24} className={checked ? 'text-lime-500' : ""}/>
            <div>
                <span className="text-2xl">{completedOrders.length}</span>
                <span className="text-xl">{' / '}</span>
                <span className="text-2xl">{filteredSlotOrders.length}</span>
            </div>
        </div>
      </div>
      {cities.length > 1 && (
        <CityFilterButtons
          cities={cities}
          slotOrders={localOrders}
          selectedCity={selectedCity}
          onCitySelect={handleCitySelect} 
        />
      )}
      <div className="flex flex-col gap-y-15">
        {filteredSlotOrders.map((order)=>(
            <AdminOrderCard key={order._id} orderId={order._id} />
        ))}
      </div>
    </div>
  );
};

export default TimeSlotGroup;
