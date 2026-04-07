import { getDB } from "@/utils/api-routes";
import { deleteUserAvatarFromGridFS } from "@/utils/deleteUserAvatarFromGridFS";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {

    try {
        const db = await getDB();
        const userId = await request.json();

        const userObjectId = ObjectId.createFromHexString(userId);

        const deleteResult = await db.collection('user').deleteOne({ _id: userObjectId });

        if(deleteResult.deletedCount === 0){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        await deleteUserAvatarFromGridFS(userId)

        return NextResponse.json({message: "User deleted successfully"}, {status: 200});
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({message: "Error deleting user.Try later."}, {status: 500});
    }
}