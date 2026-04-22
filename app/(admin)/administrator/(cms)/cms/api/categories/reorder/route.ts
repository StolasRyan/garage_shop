import { getDB } from "@/utils/api-routes";
import { ReorderRequestItem } from "../../../types";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


export async function PUT(request: Request){
    try {
        const db =await getDB();
        const items:ReorderRequestItem[]= await request.json();

        if(!Array.isArray(items)){
            return NextResponse.json({success: false, message: "Incorrect data format"}, {status: 400})
        }

        for(const item of items){
            if(!item._id || typeof item.numericId !== 'number'){
                return NextResponse.json({success: false, message: "Incorrect category data"}, {status: 400})
            }
        };

        const bulkOperations = items.map((item)=>({
            updateOne:{
                filter: {_id: new ObjectId(item._id)},
                update:{
                    $set:{
                        numericId: item.numericId,
                        updatedAt: new Date().toISOString(),
                    }
                }
            }
        }));

        if(bulkOperations.length > 0){
            const result = await db.collection('article-category').bulkWrite(bulkOperations);

            return NextResponse.json({success: true, message: "Categories reordered", modifiedCount: result.modifiedCount})
        }

        return NextResponse.json({success: true, message: "No categories to reorder"})
        
    } catch (error) {
        console.error('Failed to update order in DB', error);
        return NextResponse.json({success: false, message: "Server error"}, {status: 500})
    }
}