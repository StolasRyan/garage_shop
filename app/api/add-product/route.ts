import { getDB } from "@/utils/api-routes";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const db = await getDB();
        const productCollection = db.collection('products');

        const body = await request.json()

        const{
            title,
            description,
            basePrice,
            discountPercent,
            weight,
            quantity,
            sku,
            brand,
            manufacturer,
            isHealthyFood,
            isNonGMO,
            categories,
            tags,
            img,
            id
        } = body;

        if(!id){
            return NextResponse.json({error: "Insert products image"}, {status: 400});
        }

        const productData = {
            id: id,
            img: img || `/images/products/img-${id}.jpeg`,
            title,
            description,
            basePrice: Number(basePrice),
            discountPercent: Number(discountPercent) || 0,
            rating:{
                count: 0,
                distribution:{
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0
                }
            },
            categories: Array.isArray(categories) ? categories : [],
            weight: Number(weight),
            quantity: Number(quantity),
            tags: Array.isArray(tags) ? tags : [],
            isHealthyFood:Boolean(isHealthyFood),
            isNonGMO: Boolean(isNonGMO),
            updatedAt: new Date(),
            sku,
            brand,
            manufacturer
        }

        const result = await productCollection.insertOne(productData);

        return NextResponse.json({
            success: true,
            product: {...productData, _id: result.insertedId}
        })
    } catch (error) {
        console.error('Failed to add product:', error);
        return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
    }
   
}