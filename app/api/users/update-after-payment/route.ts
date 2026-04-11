import { getDB } from "@/utils/api-routes";
import { getServerUserId } from "@/utils/getServerUserId";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function POST(request:Request) {

    try {
        const db = await getDB();
        const requestData = await request.json();

        const {usedBonuses, earnedBonuses, purchasedProductIds} = requestData;
        const userId = await getServerUserId();

        if(!userId){
            return NextResponse.json(
                {message: 'Not autorized'},
                {status: 401}
            )
        };

        let userObjectId;
        try {
            userObjectId = ObjectId.createFromHexString(userId)
        } catch  {
            console.error('Invalid userId');
            return NextResponse.json(
                {message: 'Invalid userId'},
                {status: 400}
            )
        }

        const user = await db.collection('user').findOne({_id: userObjectId});

        if(!user){
            return NextResponse.json(
                {message: 'User not found'},
                {status: 404}
            )
        }

        const currentBonuses = user.bonusesCount || 0;
        const usedBonusesNum = Number(usedBonuses) || 0;
        const earnedBonusesNum = Number(earnedBonuses) || 0;

        if(usedBonusesNum > currentBonuses){
            return NextResponse.json(
                {message: 'Not enough bonuses',
                availableBonuses: currentBonuses,
                requiredBonuses: usedBonusesNum
                },
                {status: 400}
            )
        }

        const newBonusesCount = currentBonuses - usedBonusesNum + earnedBonusesNum;
        const currentPurchases = Array.isArray(user.purchases) ? user.purchases : [];

        const numericPurchasedIds = (purchasedProductIds || []).map((id: string) => Number(id));


        const uniqueNewIds = numericPurchasedIds.filter(
            (id:number, index: number, array: number[]) =>
                array.indexOf(id) === index
        );

        const allPurchases = [...currentPurchases, ...uniqueNewIds];

        const updatedPurchases = allPurchases.filter(
            (id:number, index: number, array: number[]) =>
                array.indexOf(id) === index
        )

        const updateResult = await db.collection('user').updateOne(
            {_id: userObjectId},
            {
                $set:{
                    bonusesCount: newBonusesCount,
                    purchases: updatedPurchases,
                    cart:[],
                    updatedAt: new Date()
                }
            }
        );

        if(updateResult.modifiedCount === 0){
            return NextResponse.json(
                {message: 'User data not updated'},
                {status: 500}
            )
        }

        return NextResponse.json({
            success: true,
            message: 'User data updated',
            updatedFields:{
                bonusesDeducted: usedBonusesNum,
                bonusesAdded: earnedBonusesNum,
                newBonusesCount,
                productsAdded: uniqueNewIds.length,
                totalPurchases: updatedPurchases.length,
                cartCleared: true
            }
        })

    } catch (error) {
        console.error('Error updating user data', error);
        return NextResponse.json(
            {message: 'Internal server Error'},
            {status: 500}
        )
    }
    
}