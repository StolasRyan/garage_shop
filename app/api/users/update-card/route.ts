import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest) {
    const db = await getDB();

    try {
        const {userId, cardNumber} = await request.json();

        if(!userId || !cardNumber){
            return NextResponse.json(
                {error: 'User ID and Card Number are required.'},
                {status: 400}
            )
        }

        let objectId;
        try {
            objectId = ObjectId.createFromHexString(userId);
        } catch {
            return NextResponse.json(
                {error: 'Incorrect User ID format.'},
                {status: 400}
            )
        }

        const user = await db.collection('user').findOne({_id: objectId});
        if(!user){
            return NextResponse.json(
                {error: 'No user found.'},
                {status: 404}
            )
        }

        const result = await db
            .collection('user')
            .updateOne(
                {_id: objectId},
                {
                    $set:{
                        card: cardNumber,
                        hasCard: true,
                        updatedAt: new Date()
                    }
                }
            );
        
        if(result.modifiedCount === 0){
            return NextResponse.json(
                {error: 'Failed to update card.'},
                {status: 500}
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Card number updated succesfully.',
            card: cardNumber,
        });

    } catch (error) {
        console.error('Failed to update card number', error)

        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Iternal server error'
        },
        {status: 500}
    )
        
    }
}