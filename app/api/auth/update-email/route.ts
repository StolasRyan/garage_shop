import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest) {
    const db = await getDB();

    try {
        const {email, userId} = await request.json();

        if(!email || !userId){
            return NextResponse.json({message: "Email and userId are required"}, {status: 400});
        }

        let objectId;

        try {
            objectId = ObjectId.createFromHexString(userId);
        } catch  {
            return NextResponse.json({message: "Invalid userId"}, {status: 400});
        }

        const existingUser = await db.collection('user').findOne({email: email, _id: {$ne: objectId}});
        if(existingUser){
            return NextResponse.json({error: "Such user already exists"}, {status: 409});
        }

        const result = await db.collection('user').updateOne(
            {_id: objectId},
            {$set: {email:email}}
        )

        return NextResponse.json({
            success: true,
            message: "Email updated successfully",
            modified: result.modifiedCount > 0
        })
    } catch (error) {
        console.error("Error while updating email", error);

        return NextResponse.json({error:error instanceof Error ? error.message : "Error while updating email"}, {status: 500});
    }
    
}