import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";



interface UserDocument{
    _id: ObjectId;
    favorites:string[];
    updatedAt: Date;
}

export async function GET(request: NextRequest){
    try{
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get('userId');

        if(!userId){
            return NextResponse.json({favorites: []})
        }

        const db = await getDB();
        const user = await db.collection<UserDocument>('user').findOne({_id: new ObjectId(userId)});

        return NextResponse.json({favorites: user?.favorites || []})
    }catch{
        return NextResponse.json(
            {error: 'Failed to load favorites'},
            {status: 500}
        )
    }
};

export async function POST(request:NextRequest) {
    try {
        const {userId, productId, action} = await request.json();

        if(!userId || !productId){
            return NextResponse.json(
                {error: 'userId and productId required'},
                {status: 400}
            )
        }

        const db = await getDB();
        const userObjectId = ObjectId.createFromHexString(userId);

        if(action === 'add'){
            const result = await db.collection<UserDocument>('user').updateOne(
                {_id : userObjectId},
                {
                    $addToSet:{favorites: productId},
                    $set:{updatedAt: new Date()}
                }
            );
            if(result.matchedCount === 0){
                return NextResponse.json({error: "User not found"}, {status: 404})
            }
            return NextResponse.json({success: true})
        }

        if(action === 'remove'){
             const result = await db.collection<UserDocument>('user').updateOne(
                {_id : userObjectId},
                {
                    $pull:{favorites: productId},
                    $set:{updatedAt: new Date()}
                }
            );

            if(result.matchedCount === 0){
                return NextResponse.json({error: "User not found"}, {status: 404})
            }

            return NextResponse.json({success: true})
        }

        return NextResponse.json({error: 'Incorrect action'}, {status: 400})
    } catch  {
        return NextResponse.json(
            {error: 'Favorites changing error'},
            {status: 500}
        )
    }
    
}