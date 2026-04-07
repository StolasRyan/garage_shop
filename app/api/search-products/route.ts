import { getDB } from "@/utils/api-routes";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
    
    try {
        const {searchParams} = new URL(request.url);
        const query = searchParams.get("query") || '';

        if(!query && query?.trim().length < 3){
            return NextResponse.json(
                {error: "Incorrect request parametrs, 3 or more symbols required"},
                {status: 400}
            )
        }

        const db = await getDB();

        const searchRegex = new RegExp(query.trim(),'i');

        const products = await db.collection('products')
        .find({
            $or:[
                {title: {$regex: searchRegex}},
                {sku: {$regex: searchRegex}},
                {description: {$regex: searchRegex}}
            ]
        }).project({
            id:1,
            title:1,
            sku:1,
            basePrice:1,
            quantity:1,
            categories:1,
        }).sort({title:1}).toArray();

        return NextResponse.json({
            success: true,
            products
        });
    } catch (error) {
        console.error("Server error while searching products:", error);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}