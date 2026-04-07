import { getDB } from "@/utils/api-routes";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try{

        const db = await getDB();
        const productsCollection = db.collection('products');

        const body = await request.json();
        const {id} = body;

        if(!id){
            return NextResponse.json(
                {error: "Product ID required"},
                {status: 400}
            )
        }

        const existingProduct = await productsCollection.findOne({id: parseInt(id)});

        if(!existingProduct){
            return NextResponse.json(
                {error: "Product not found"},
                {status: 404}
            )
        }

        const result = await productsCollection.deleteOne({ id: parseInt(id) });

        if(result.deletedCount === 0){
            return NextResponse.json(
                {error: "Product not found"},
                {status: 404}
            )
        }

        return NextResponse.json({success: true, message: "Product deleted successfully"})

    }catch(error){
        console.error("Failed to delete product:", error);
        return NextResponse.json(
            {error: "Failed to delete product."},
            {status: 500}
        )
    }
}