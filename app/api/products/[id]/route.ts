import { getDB } from "@/utils/api-routes";
import { NextRequest, NextResponse } from "next/server";



export const dynamic = 'force-dynamic';

export async function GET(request:NextRequest, {params}:{params:Promise<{id: string}>}) {
    try {
        const {id} = await params;
        const db = await getDB();

        const product = await db.collection('products').findOne({id: parseInt(id)});

        if(!product){
            return NextResponse.json(
                {message: 'Protuct not found'},
                {status: 404}
            )
        }

        // const reviewsCount = await db.collection('reviews').countDocuments({productId: id});
        // const updatedProduct = {...product};
        // if(updatedProduct.rating){
        //     updatedProduct.rating.count = reviewsCount
        // }
        return NextResponse.json(product) //<=updatedProduct??
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return NextResponse.json(
            {message: `Iternal server error in product fetching`},
            {status:500}
        )
    }
}