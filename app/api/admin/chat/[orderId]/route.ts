import { getDB } from "@/utils/api-routes";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ orderId: string }> }
) {
    try {
        const {orderId} = await params;
        const db = await getDB();

        const messages = await db.collection('chatMessages')
        .find({orderId})
        .sort({timestamp: 1})
        .toArray();

        return NextResponse.json(messages)
    } catch (error) {
        console.error("Failed to upload messages:",error);
        return NextResponse.json(
            {error: 'Internal server Error'},
            {status:500}
        )
    }
}