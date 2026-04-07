import { SearchProduct } from "@/types/searchProduct";
import { getDB } from "@/utils/api-routes";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    try{
        const {searchParams} = new URL(request.url);
        const query = searchParams.get("query") || '';
   

        const db = await getDB();
        const products = await db.collection('products').find({
            $and:[{
                $or:[
                {title: {$regex: query, $options: 'i'}}, 
                {description: {$regex: query, $options: 'i'}}, 
            ]
            }, {quantity: {$gt: 0}}]
        }).project({
            title:1,
            categories:1,
            id:1
        }).toArray() as SearchProduct[];
        
        if(!products.length){
            return NextResponse.json([])
        }
        const groupedByCategory: Record<string, SearchProduct[]> = {};
        for(const product of products){
            for(const category of product.categories){
                const normalizedCategory = category.toLowerCase();

                if(!groupedByCategory[normalizedCategory]){
                    groupedByCategory[normalizedCategory] = [];
                }

                groupedByCategory[normalizedCategory].push(product);
            }
        }
        const result = Object.entries(groupedByCategory).map(([category, products])=>({
            category,
            products
        }))
        return NextResponse.json(result);
    }
    catch(e){
        console.error("Search error",e)
        return NextResponse.json({error: "Search error"}, {status: 500})
    }
}