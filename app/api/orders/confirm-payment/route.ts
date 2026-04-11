import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const db = await getDB();
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { message: "Order ID required" },
        { status: 400 },
      );
    }

    const order = await db
      .collection("orders")
      .findOne({ _id: ObjectId.createFromHexString(orderId) });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    for (const item of order.items) {
      const productIdNumber = parseInt(item.productId);

      await db.collection("products").updateOne(
        { id: productIdNumber },
        {
          $inc: {
            quantity: -item.quantity,
          },
          $set: {
            updatedAt: new Date(),
          },
        },
      );
    }

    await db.collection('orders').updateOne(
        {_id: ObjectId.createFromHexString(orderId)},
        {
            $set:{
                status: "confirmed",
                paymentStatus: "paid",
                paidAt: new Date(),
                updatedAt: new Date()
            }
        }
    )

    return NextResponse.json({ success: true, message: "Order confirmed,products updated" });
  } catch (error) {
    console.error("Error confirming order:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
