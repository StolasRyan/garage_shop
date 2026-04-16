import { getDB } from "@/utils/api-routes";
import { getServerUserId } from "@/utils/getServerUserId";
import { NextResponse } from "next/server";


export async function POST(
    request: Request,
    { params }: { params: Promise<{ orderId: string }> }
){
    try {
        const {orderId} = await params;
        const userId = await getServerUserId();
        const db = await getDB();

        console.log(orderId, userId);
        

        await db.collection('chatMessages').updateMany(
            {
                orderId,
                readBy: {$ne: userId}
            },
            {$addToSet: {readBy: userId}}
        );
        return NextResponse.json({success: true})
    } catch {
        
        return NextResponse.json({error: 'Internal server Error'}, {status: 500})   
    }
}