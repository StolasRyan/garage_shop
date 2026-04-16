
import TimeSlotGroup from "./TimeSlotGroup";
import { useGetAdminOrdersQuery } from "@/store/redux/api/ordersApi";

interface TimeSlotSectionProps {
  orderIds : string[];
}

const TimeSlotSection = ({ orderIds }: TimeSlotSectionProps) => {

  const {data} = useGetAdminOrdersQuery()

  const orders = data?.orders.filter((order)=>orderIds.includes(order._id)) || [];

  const timeSlots = [...new Set(orders.map((order) => order.deliveryTimeSlot))].sort();

  const timeSlotGroups = timeSlots.map((timeSlot) => ({
    timeSlot,
    orderIds: orders
      .filter((order) => order.deliveryTimeSlot === timeSlot)
      .map((order) => order._id),
  }))

  
  return (
    <div className="flex flex-col gap-y-30">
      {timeSlotGroups.map(({timeSlot, orderIds}) =>(
            <TimeSlotGroup key={timeSlot} orderIds={orderIds} timeSlot={timeSlot}/>
       ))}
    </div>
  );
};

export default TimeSlotSection;
