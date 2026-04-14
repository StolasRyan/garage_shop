"use client";

import ErrorComponent from "@/app/components/ErrorComponent";
import { Loader } from "@/app/components/Loader";
import { Order } from "@/types/order";
import { useEffect, useState } from "react";
import AdminOrdersHeader from "./_components/AdminOrdersHeader";
import { getThreeDaysDates } from "../delivery-times/utils/getThreeDaysDates";
import DateSelector from "./_components/DateSelector";
import TimeSlotSection from "./_components/TimeSlotSection";

interface OrderStats {
  nextThreeDaysOrders: number;
}

const AdminOrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [customDate, setCustomDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/users/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data.orders);
      setStats(data.stats);

      const threeDaysDates = getThreeDaysDates();
      const today = threeDaysDates[0];
      setSelectedDate(today);

      const todayOrders = data.orders.filter(
        (order: Order) => order.deliveryDate === today,
      );
      setFilteredOrders(todayOrders);
    } catch (error) {
      setError({
        error: error instanceof Error ? error : new Error("Unknown error"),
        userMessage: "Failed to fetch orders",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const threeDaysDates = getThreeDaysDates();

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
      const filteredOrders = orders.filter(
        (order: Order) => order.deliveryDate === formattedDate,
      );
      setFilteredOrders(filteredOrders);
      setIsCalendarOpen(false);
    }
  };

  const filterOrdersByDate = (date: string)=>{
    setSelectedDate(date);
    setCustomDate(undefined);
    setIsCalendarOpen(false);
    const filteredOrders = orders.filter(
      (order: Order) => order.deliveryDate === date,
    );
    setFilteredOrders(filteredOrders);
  }

  if (loading) return <Loader />;

  if (error)
    return (
      <ErrorComponent error={error.error} userMessage={error.userMessage} />
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
      <TimeSlotSection filteredOrders={filteredOrders} />
    </div>
  );
};

export default AdminOrderPage;
