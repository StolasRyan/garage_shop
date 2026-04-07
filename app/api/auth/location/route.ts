import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const db = await getDB();
        const body = await request.json()

        const {userId, region, location} = body;

        if(!userId){
            return NextResponse.json(
                {error:'User ID required'},
                {status: 400}
            )
        }

        const result = await db.collection('user').updateOne(
            {_id: ObjectId.createFromHexString(userId)},
            {
                $set:{
                    region,
                    location,
                    updatedAt: new Date(),
                }
            }
        );

        if(result.matchedCount === 0){
            return NextResponse.json(
                {error: 'No user found'},
                {status: 404}
            )
        };

        return NextResponse.json({
            success: true,
            message: "Location data updated succesfully"
        });

    } catch (error) {
        console.error("Location update failed", error);
        return NextResponse.json(
            {error: "Iternal Server Error"},
            {status: 500}
        )
    }
}