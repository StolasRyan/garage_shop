import { getDB } from "@/utils/api-routes";
import { getServerUserId } from "@/utils/getServerUserId";
import { NextResponse } from "next/server";



export async function GET(req: Request, { params }: { params: Promise<{ orderId: string }> }) {
    try {
        const {orderId} = await params;
        const userId= await getServerUserId();
        const db = await getDB();

        if(!userId){
            return NextResponse.json(false)
        }

            // const hasUnread = await db.collection('chatMessages').findOne({
            //     orderId,
            //     readBy: {$ne: userId}
            // })

        const unreadMessagesCount = await db.collection('chatMessages').countDocuments({
            orderId,
            readBy: {$ne: userId}
        })

        const hasUnread = unreadMessagesCount > 0

        return NextResponse.json({hasUnread:!!hasUnread, unreadMessagesCount})

        // return NextResponse.json(!!hasUnread)
    } catch (error) {
        console.error("Failed to upload unread messages:",error);
        return NextResponse.json(
            {error: 'Internal server Error'},
            {status:500}
        )
    }
}