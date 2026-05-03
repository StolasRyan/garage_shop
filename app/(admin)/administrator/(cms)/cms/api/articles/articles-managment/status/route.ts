import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest) {
    try {
        const {id, status} = await request.json();

        if(!id || !status){
            return NextResponse.json(
                {success: false, message: "No ID or status provided"},
                {status: 400}
            )
        };

        const validStatuses = ["published", "draft", "archived", "deleted"];
        if(!validStatuses.includes(status)){
            return NextResponse.json(
                {success: false, message: "Invalid status provided"},
                {status: 400}
            )
        };

        const db = await getDB();
        const objectId = ObjectId.createFromHexString(id);

        const result = await db.collection('articles').updateOne(
            {_id: objectId},
            {$set: {status, updatedAt: new Date()}}
        )

        if(result.modifiedCount === 0){
            return NextResponse.json(
                {success: false, message: "Article not found"},
                {status: 404}
            )
        };

        return NextResponse.json(
            {success: true, message: "Status changed successfully"},
            {status: 200}
        )
    } catch (error) {
        console.error('Failed to change status:', error)
        return NextResponse.json(
            {success: false, message: "Server error"},
            {status: 500}
        )
    }
}