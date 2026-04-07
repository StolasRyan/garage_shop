import { ProductCardProps } from "@/types/product";
import { getDB } from "@/utils/api-routes";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request:NextRequest) {
    try {
        const {searchParams} = new URL(request.url)
        const productId = searchParams.get('productId');
        const category = searchParams.get('category');
        const limit = parseInt(searchParams.get('limit') || '4');

        console.log(productId, category, limit);
        

        if(!productId || !category){
            return NextResponse.json(
                {error: 'ID of product and category required'},
                {status: 400}
            )
        }

        const db = await getDB()

        const similarProducts = await db.collection<ProductCardProps>('products')
        .aggregate([
            {
                $match:{
                    categories:{$in:[category]},
                    id:{$ne: parseInt(productId)}
                }
            },
            {$sample: {size: limit}}
        ]).toArray();
        console.log(similarProducts);
        

        return NextResponse.json({similarProducts})
    } catch (error) {
        console.error('Failed to fetch similar products', error);
        return NextResponse.json(
            {error:'Internal server error'},
            {status: 500}
        )
    }
}