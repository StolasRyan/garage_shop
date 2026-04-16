"use client";

import ErrorComponent from "@/app/components/ErrorComponent";
import { Loader } from "@/app/components/Loader";
import { useEffect, useMemo, useState } from "react";
import AdminOrdersHeader from "./_components/AdminOrdersHeader";
import { getThreeDaysDates } from "../delivery-times/utils/getThreeDaysDates";
import DateSelector from "./_components/DateSelector";
import TimeSlotSection from "./_components/TimeSlotSection";
import { useGetAdminOrdersQuery } from "@/store/redux/api/ordersApi";
import { Order } from "@/types/order";


const AdminOrderPage = () => { 
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [customDate, setCustomDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);


  const {data, isLoading, error: queryError} = useGetAdminOrdersQuery(undefined,{
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  });
  
const orders = useMemo(()=>data?.orders || [], [data?.orders]);
const stats = useMemo(()=>data?.stats || null,[data?.stats]);
const threeDaysDates = getThreeDaysDates();

useEffect(()=>{
  if(orders.length > 0 && !selectedDate){
    const today = getThreeDaysDates()[0];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedDate(today)
  }
},[orders, selectedDate])

useEffect(()=>{
  console.log()
},[])

const filteredOrdersIds = useMemo(()=>{
  if(orders.length === 0) return [];
  const targetDate = selectedDate || getThreeDaysDates()[0];
  return orders.filter((order: Order) => order.deliveryDate === targetDate).map((order: Order) => order._id);
},[orders, selectedDate])
  

  const toggleCalendar = () =>{
    setIsCalendarOpen(!isCalendarOpen);
  }

  const handleDateSelect = (date: Date | undefined) => {
    setCustomDate(date);
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setSelectedDate(formattedDate);
    
      setIsCalendarOpen(false);
    }
  };

  const filterOrdersByDate = (date: string)=>{
    setSelectedDate(date);
    setCustomDate(undefined);
    setIsCalendarOpen(false);
   
  }

  if (isLoading) return <Loader />;

  if (queryError)
    return (
      <ErrorComponent error={queryError instanceof Error ? queryError : new Error("Unknown error")} userMessage={'Failed to load users orders'} />
    );
  return (
    <div className="px-[max(12px,calc((100%-1208px)/2))] mx-auto mb-8 py-8">
      <AdminOrdersHeader stats={stats} />
      <DateSelector
        orders={orders}
        customDate={customDate}
        dates={threeDaysDates}
        selectedDate={selectedDate}
        onDateSelect={filterOrdersByDate}
        isCalendarOpen={isCalendarOpen}
        toggleCalendar={toggleCalendar}
        onCalendarDateSelect={handleDateSelect}
      />
      <TimeSlotSection orderIds={filteredOrdersIds} />
    </div>
  );
};

export default AdminOrderPage;
