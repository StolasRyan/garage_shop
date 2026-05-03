import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { id, isFeatured } = await request.json();

    if (!id || typeof isFeatured !== "boolean") {
      return NextResponse.json(
        { success: false, message: "No ID provided or Featured status" },
        { status: 400 },
      );
    };

    if(!ObjectId.isValid(id)){
        return NextResponse.json(
            { success: false, message: "Invalid article ID provided" },
            { status: 400 },
          );
    };

    const db = await getDB();
    const objectId = ObjectId.createFromHexString(id);

    const result = await db.collection('articles').updateOne(
        {_id: objectId},
        {$set: {isFeatured, updatedAt: new Date()}}
    )

    if(result.modifiedCount === 0){
        return NextResponse.json(
            {success: false, message: "Article not found"},
            {status: 404}
        )
    }

    return NextResponse.json(
        {success: true, message: "Article updated successfully"},
        {status: 200}
    ) 
  } catch (error) {
    console.error("Error updating article featured status", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
