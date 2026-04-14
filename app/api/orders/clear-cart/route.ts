import { getDB } from "@/utils/api-routes";
import { getServerUserId } from "@/utils/getServerUserId";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function POST() {
    try {
        const db = await getDB();
        const userId = await getServerUserId();

        if(!userId){
            return NextResponse.json(
                {message: 'Not autorized'},
                {status: 401}
            )
        };

        await db.collection('user').updateOne(
            {_id: ObjectId.createFromHexString(userId)},
            {$set: {cart: [], updatedAt: new Date()}}
        );

        return NextResponse.json({
            success: true,
            message: 'Cart cleared'
        })
    } catch (error) {
        console.error('Error clearing cart', error);
        return NextResponse.json(
            {message: 'Internal server Error'},
            {status: 500}
        )
    }
}