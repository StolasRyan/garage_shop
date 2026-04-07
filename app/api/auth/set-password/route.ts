import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest){
    try {
        const {userId, password} = await request.json();

        const db = await getDB();

        const result = await db.collection('user').updateOne(
            {_id: ObjectId.createFromHexString(userId)},
            {$set: {password: await bcrypt.hash(password, 10)}}
        )

        if(result.matchedCount === 0){
            return Response.json(
                {error: "User not found"},
                {status: 404}
            )
        }

        return Response.json({success: true}, {status: 200})
         
    } catch (error) {
        console.error('Error while setting password', error);
        return Response.json(
            {error: "Server Error"},
            {status: 500}
        )
    }
}