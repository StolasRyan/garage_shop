import { CatalogProps } from "@/types/catalog";
import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
export const revalidate = 3600;

export async function GET(){
    try{
        const db = await getDB();
        const catalog = await db.collection("catalog").find().toArray( );
        return NextResponse.json(catalog); 
    }
    catch(e){
        console.error("Server error", e);
        return NextResponse.json({error: "Server error Catalog db"}, {status: 500});
    }
} 

export async function POST(request: Request){
    try{
        const db = await getDB();
        const updatedCategories:CatalogProps[] = await request.json()

        const bulkOps = updatedCategories.map((category)=>({
            updateOne:{
                filter: {_id: new ObjectId(category._id)},
                update: {
                    $set: {
                        order: category.order,
                        title: category.title,
                        img: category.img,
                        colSpan: category.colSpan,
                        tabletColSpan: category.tabletColSpan,
                        mobileColSpan: category.mobileColSpan
                    }
                }
            }
        }));
        const result = await db.collection("catalog").bulkWrite(bulkOps);
        return NextResponse.json({
            success: true,
            updatedCount: result.modifiedCount,
        });
    }
    catch(e){
        console.error("Error while updating categories order", e);
        return NextResponse.json({error: "Error while updating categories order"}, {status: 500});
    }
} 