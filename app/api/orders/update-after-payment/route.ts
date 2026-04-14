import { getDB } from "@/utils/api-routes";
import { getServerUserId } from "@/utils/getServerUserId";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const db = await getDB();
    const requestData = await request.json();

    const { 
      orderId, 
      usedBonuses, 
      earnedBonuses, 
      purchasedProductIds 
    } = requestData;

    const userId = await getServerUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Not authorized" },
        { status: 401 }
      );
    }

    if (!orderId) {
      return NextResponse.json(
        { message: "Order ID required" },
        { status: 400 }
      );
    }

    let userObjectId;
    let orderObjectId;
    
    try {
      userObjectId = ObjectId.createFromHexString(userId);
      orderObjectId = ObjectId.createFromHexString(orderId);
    } catch {
      console.error("Invalid ID format:", { userId, orderId });
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    // 1. НАХОДИМ ЗАКАЗ И ПОЛЬЗОВАТЕЛЯ
    const [order, user] = await Promise.all([
      db.collection("orders").findOne({ _id: orderObjectId }),
      db.collection("user").findOne({ _id: userObjectId })
    ]);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 2. ОБРАБОТКА БОНУСОВ (если переданы)
    if (usedBonuses !== undefined || earnedBonuses !== undefined) {
      const currentBonuses = user.bonusesCount || 0;
      const usedBonusesNum = Number(usedBonuses) || 0;
      const earnedBonusesNum = Number(earnedBonuses) || 0;

      if (usedBonusesNum > currentBonuses) {
        return NextResponse.json(
          {
            message: "Not enough bonuses",
            availableBonuses: currentBonuses,
            requiredBonuses: usedBonusesNum,
          },
          { status: 400 }
        );
      }

      const newBonusesCount = currentBonuses - usedBonusesNum + earnedBonusesNum;

      // 3. ОБНОВЛЕНИЕ ПОКУПОК ПОЛЬЗОВАТЕЛЯ (если переданы)
      let updatedPurchases = Array.isArray(user.purchases) ? user.purchases : [];
      
      if (purchasedProductIds && purchasedProductIds.length > 0) {
        const numericPurchasedIds = purchasedProductIds.map((id: string) => Number(id));
        const uniqueNewIds = numericPurchasedIds.filter(
          (id: number, index: number, array: number[]) => array.indexOf(id) === index
        );

        const allPurchases = [...updatedPurchases, ...uniqueNewIds];
        updatedPurchases = allPurchases.filter(
          (id: number, index: number, array: number[]) => array.indexOf(id) === index
        );
      }

      // ОБНОВЛЯЕМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
      await db.collection("user").updateOne(
        { _id: userObjectId },
        {
          $set: {
            bonusesCount: newBonusesCount,
            purchases: updatedPurchases,
            updatedAt: new Date(),
          },
        }
      );
    }

    // 4. СПИСЫВАЕМ ТОВАРЫ ИЗ ЗАКАЗА
    for (const item of order.items) {
      const productIdNumber = parseInt(item.productId);
      await db.collection("products").updateOne(
        { id: productIdNumber },
        {
          $inc: { quantity: -item.quantity },
          $set: { updatedAt: new Date() },
        }
      );
    }

    // 5. ОБНОВЛЯЕМ СТАТУС ЗАКАЗА
    await db.collection("orders").updateOne(
      { _id: orderObjectId },
      {
        $set: {
          status: "confirmed",
          paymentStatus: "paid",
          paidAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Order confirmed, payment successful, data updated successfully",
    });

  } catch (error) {
    console.error("Payment confirmation error:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function POST(request:Request) {

//     try {
//         const db = await getDB();
//         const requestData = await request.json();

//         const {usedBonuses, earnedBonuses, purchasedProductIds} = requestData;
//         const userId = await getServerUserId();

//         if(!userId){
//             return NextResponse.json(
//                 {message: 'Not autorized'},
//                 {status: 401}
//             )
//         };

//         let userObjectId;
//         try {
//             userObjectId = ObjectId.createFromHexString(userId)
//         } catch  {
//             console.error('Invalid userId');
//             return NextResponse.json(
//                 {message: 'Invalid userId'},
//                 {status: 400}
//             )
//         }

//         const user = await db.collection('user').findOne({_id: userObjectId});

//         if(!user){
//             return NextResponse.json(
//                 {message: 'User not found'},
//                 {status: 404}
//             )
//         }

//         const currentBonuses = user.bonusesCount || 0;
//         const usedBonusesNum = Number(usedBonuses) || 0;
//         const earnedBonusesNum = Number(earnedBonuses) || 0;

//         if(usedBonusesNum > currentBonuses){
//             return NextResponse.json(
//                 {message: 'Not enough bonuses',
//                 availableBonuses: currentBonuses,
//                 requiredBonuses: usedBonusesNum
//                 },
//                 {status: 400}
//             )
//         }

//         const newBonusesCount = currentBonuses - usedBonusesNum + earnedBonusesNum;
//         const currentPurchases = Array.isArray(user.purchases) ? user.purchases : [];

//         const numericPurchasedIds = (purchasedProductIds || []).map((id: string) => Number(id));


//         const uniqueNewIds = numericPurchasedIds.filter(
//             (id:number, index: number, array: number[]) =>
//                 array.indexOf(id) === index
//         );

//         const allPurchases = [...currentPurchases, ...uniqueNewIds];

//         const updatedPurchases = allPurchases.filter(
//             (id:number, index: number, array: number[]) =>
//                 array.indexOf(id) === index
//         )

//         const updateResult = await db.collection('user').updateOne(
//             {_id: userObjectId},
//             {
//                 $set:{
//                     bonusesCount: newBonusesCount,
//                     purchases: updatedPurchases,
//                     cart:[],
//                     updatedAt: new Date()
//                 }
//             }
//         );

//         if(updateResult.modifiedCount === 0){
//             return NextResponse.json(
//                 {message: 'User data not updated'},
//                 {status: 500}
//             )
//         }

//         return NextResponse.json({
//             success: true,
//             message: 'User data updated',
//             updatedFields:{
//                 bonusesDeducted: usedBonusesNum,
//                 bonusesAdded: earnedBonusesNum,
//                 newBonusesCount,
//                 productsAdded: uniqueNewIds.length,
//                 totalPurchases: updatedPurchases.length,
//                 cartCleared: true
//             }
//         })

//     } catch (error) {
//         console.error('Error updating user data', error);
//         return NextResponse.json(
//             {message: 'Internal server Error'},
//             {status: 500}
//         )
//     }
    
// }