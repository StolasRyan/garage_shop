import { getDB } from "@/utils/api-routes";
import { ReorderRequestItem } from "../../../../articles/articlesManagment/types";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


export async function PUT(request:Request){
    try {
        const db = await getDB();
        const items:ReorderRequestItem[]= await request.json();

        if(!Array.isArray(items)){
            return NextResponse.json({success: false, message: "Incorrect data format"}, {status: 400})
        };

        for(const item of items){
            if(!item._id || typeof item.numericId !== 'number'){
                return NextResponse.json({success: false, message: "Incorrect article data"}, {status: 400})
            }
        };

        const bulkOperations = items.map((item)=>({
            updateOne:{
                filter:{_id: new ObjectId(item._id)},
                update:{
                    $set:{
                        numericId: item.numericId,
                        updatedAt: new Date().toISOString(),
                    }
                }
            }
        }));

        if(bulkOperations.length > 0){
            const result = await db.collection('articles').bulkWrite(bulkOperations);
            return NextResponse.json({
                success: true,
                message: "Articles reordered successfully",
                modifiedCount: result.modifiedCount,
            });
        }
        return NextResponse.json({success: true, message: "No articles to reorder"})
    } catch (error) {
        console.error("Error reordering articles", error);
        return NextResponse.json({success: false, message: "Failed to reorder articles"}, {status: 500})
    }
}