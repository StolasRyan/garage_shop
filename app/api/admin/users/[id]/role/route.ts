import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
    try {
        const {role} = await request.json();
        const {id} = await params
        console.log(role, id);
        
        const db = await getDB();

        const result = await db.collection('user').updateOne(
            {_id: ObjectId.createFromHexString(id)},
            {$set: {role, updatedAt: new Date()}}
        );

        if(result.modifiedCount === 0){
            return NextResponse.json(
                {error: 'User not found or role didnt changed'},
                {status: 404}
            )
        }

        return NextResponse.json({
            success: true,
            id,
            role
        })
    } catch (error) {
        console.error('Failed to change role:', error)
        return NextResponse.json(
                {error: 'Failed to change role'},
                {status: 500}
            )
    }
}
