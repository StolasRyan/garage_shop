import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest) {
    const db = await getDB();

    try {
        const {phoneNumber, userId} = await request.json();

        console.log(phoneNumber);
        

        if(!phoneNumber || !userId){
            return NextResponse.json({message: "phoneNumber and userId are required"}, {status: 400});
        }

        let objectId;

        try {
            objectId = ObjectId.createFromHexString(userId);
        } catch  {
            return NextResponse.json({message: "Invalid userId"}, {status: 400});
        }

        const existingUser = await db.collection('user').findOne({phoneNumber: phoneNumber, _id: {$ne: objectId}});
        if(existingUser){
            return NextResponse.json({error: "Such user already exists"}, {status: 409});
        }

        const result = await db.collection('user').updateOne(
            {_id: objectId},
            {$set: {phoneNumber:phoneNumber}}
        )

        return NextResponse.json({
            success: true,
            message: "phoneNumber updated successfully",
            modified: result.modifiedCount > 0
        })
    } catch (error) {
        console.error("Error while updating phoneNumber", error);

        return NextResponse.json({error:error instanceof Error ? error.message : "Error while updating phoneNumber"}, {status: 500});
    }
    
}