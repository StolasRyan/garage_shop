import { getDB } from "@/utils/api-routes";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDB();

    const today = new Date();

    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const oneMonthAgo = new Date(todayStart);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const dayAfterTomorrow = new Date(todayStart);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    const formatDate = (date: Date): string => date.toISOString().split("T")[0];

    const todayString = formatDate(todayStart);
    const oneMonthAgoString = formatDate(oneMonthAgo);
    const dayAfterTomorrowString = formatDate(dayAfterTomorrow);

    const orders = await db
      .collection("orders")
      .find({
        deliveryDate: {
          $gte: oneMonthAgoString,
          $lte: dayAfterTomorrowString,
        },
      })
      .sort({ deliveryDate: -1, deliveryTimeSlot: 1 })
      .toArray();

    const nextThreeDaysOrders = orders.filter(
      (order) =>
        order.deliveryDate >= todayString &&
        order.deliveryDate <= dayAfterTomorrowString,
    ).length;

    const stats = {
      nextThreeDaysOrders,
    };

    return NextResponse.json({ orders, stats });
  } catch (error) {
    console.error("Failed to get orders", error);
    return NextResponse.json(
      { error: "Failed to get orders" },
      { status: 500 },
    );
  }
}
