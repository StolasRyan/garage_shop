import { getDB } from "@/utils/api-routes";
import { getServerUserId } from "@/utils/getServerUserId";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const db = await getDB();
    const userId = await getServerUserId();
    const { orderId, message, userName, userRole } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
    const chatMessage = {
      orderId,
      userId,
      userName,
      message,
      timestamp: new Date(),
      readBy:[userId],
      userRole,
    };

    const result = await db.collection("chatMessages").insertOne(chatMessage);

    return NextResponse.json({
        ...chatMessage,
        _id: result.insertedId
    })
  } catch (error) {
    console.error("Failed to create chat message:", error);
    return NextResponse.json({ message: "Internal server Error" }, { status: 500 });
  }
}
