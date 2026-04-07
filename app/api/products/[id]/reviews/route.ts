import { getDB } from "@/utils/api-routes";
import { NextRequest, NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function GET(
    _request: NextRequest,
    {params}:{params:Promise<{id:string}>}
) {
    try {
        const {id} = await params;
        const db = await getDB();

        const reviews = await db.collection('reviews')
        .find({productId: id})
        .sort({createdAt: -1})
        .toArray()

        return NextResponse.json(reviews)
    } catch (error) {
        console.error("Failed to upload reviews:",error)
        return NextResponse.json(
            {error: 'Failed to upload reviews'},
            {status:500}
        )
    }
}

export async function POST(
    request:NextRequest,
    {params}:{params:Promise<{id:string}>}
) {
    try {
        const {id: productId} = await params;
        const {userId, userName, rating, comment} = await request.json();


        if(!userId || !userName || !rating || !comment){
            return NextResponse.json({message:'All fields are required'}, {status:400})
        }

        const db = await getDB();

        const existingReview = await db.collection('reviews').findOne({
            productId,
            userId
        });

        if(existingReview){
            return NextResponse.json(
                {message: "You alredy made review"},
                {status:400}
            )
        }

        const product = await db.collection('products').findOne({id: parseInt(productId)});

        if(!product){
            return NextResponse.json(
                {message: 'Product not found'},
                {status: 400}
            )
        }

        const newDestribution = {...product.rating.distribution}
        const ratingKey = rating.toString() as keyof typeof newDestribution;
        newDestribution[ratingKey] +=1;

        const newCount = product.rating.count + 1;

        const totalRating = newDestribution['1'] * 1 + newDestribution['2'] * 2 + newDestribution['3'] * 3 + newDestribution['4'] * 4 + newDestribution['5'] * 5;
        const newAverage =Math.round((totalRating/newCount)*10) / 10;

        await db.collection('products').updateOne(
            {id: parseInt(productId)},
            {
                $set:{
                    "rating.distribution": newDestribution,
                    "rating.count": newCount,
                    "rating.rate": newAverage,
                    updatedAt:new Date()
                }
            }
        );

        const newReview = {
            productId,
            userId,
            userName,
            rating: Number(rating),
            comment: comment.trim(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await db.collection('reviews').insertOne(newReview);

        return NextResponse.json({success: true},{status:201})
    } catch (error) {
        console.error('Failed to add reviews', error)

        return NextResponse.json(
            {message: "Server error"},
            {status: 500}
        )
        
    }
}