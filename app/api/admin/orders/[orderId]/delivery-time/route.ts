import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    const { orderId } = await params;

  if (!orderId) {
    return NextResponse.json(
      { error: "Order id is required" },
      { status: 400 },
    );
  }

  const { deliveryDate, deliveryTimeSlot } = await request.json();

  if (!deliveryDate || !deliveryTimeSlot) {
    return NextResponse.json(
      { error: "Delivery date and time slot are required" },
      { status: 400 },
    );
  }

  const db = await getDB();

  const result = await db.collection("orders").updateOne(
    { _id: new ObjectId(orderId) },
    {
      $set: {
        deliveryDate,
        deliveryTimeSlot,
        updatedAt: new Date(),
      },
    },
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    message: "Delivery time updated successfully",
    data: { deliveryDate, deliveryTimeSlot },
  });
  } catch (error) {
    console.error("Failed to update delivery time", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
