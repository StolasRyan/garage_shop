"use client";
import ErrorComponent from "@/app/components/ErrorComponent";
import { Loader } from "@/app/components/Loader";
import { Order } from "@/types/order";
import { useEffect, useState } from "react";
import UserOrdersList from "./_components/UserOrdersList";

const UserOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/orders");

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        if (data.success) {
          setOrders(data.orders || []);
        } else {
          throw new Error(data.message || "Error in loading orders");
        }
      } catch (error) {
        setError({
          error: error instanceof Error ? error : new Error("Unknown error"),
          userMessage: "Failed to download orders. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  console.log(orders);
  if (loading) return <Loader />;

  if (error) {
    return (
      <ErrorComponent error={error.error} userMessage={error.userMessage} />
    );
  }

  if (orders.length === 0) {
    return (
      <div className="px-[max(12px,calc((100%-1208px)/2))] mx-auto py-8">
        <h1 className="mb-6 md:mb-8 xl:mb-10 flex flex-row text-4xl md:text-5xl xl:text-[64px] text-gray-600">
          Orders
        </h1>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            No orders yet.
          </h2>
          <p className="text-gray-500 max-w-md">
            At here will be a list of your orders, when you have any.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-[max(12px,calc((100%-1208px)/2))] mx-auto py-8">
      <h1 className="mb-6 md:mb-8 xl:mb-10 flex flex-row text-4xl md:text-5xl xl:text-[64px] text-gray-600">
        Orders
      </h1>

    <UserOrdersList orders={orders}/>
    </div>
  );
};

export default UserOrdersPage;
