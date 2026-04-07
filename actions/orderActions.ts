'use server';
import { getDB } from "@/utils/api-routes";
import { getServerUserId } from "@/utils/getServerUserId";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export interface OrderCartItem {
  productId: string;
  quantity: number;
  addedAt: Date;
  hasLoyaltyDiscount: boolean;
}

export async function getOrderCartAction(): Promise<OrderCartItem[]> {
  try {
    const userId = await getServerUserId();
    if (!userId) return [];

    const db = await getDB();
    const user = await db
      .collection("user")
      .findOne({ _id: ObjectId.createFromHexString(userId) });

    return user?.cart || [];
  } catch (error) {
    console.error("Failed to get cart", error);
    return [];
  }
}

export const getUserBonusesAction = async (): Promise<{
  bonusesCount: number;
  hasLoyaltyCard: boolean;
}> => {
  try {
    const userId = await getServerUserId();
    if (!userId) return { bonusesCount: 0, hasLoyaltyCard: false };

    const db = await getDB();
    const user = await db
      .collection("user")
      .findOne({ _id: ObjectId.createFromHexString(userId) });

    const bonusesCount = user?.bonusesCount || 0;
    const hasLoyaltyCard = !!(user?.card && user.card !== "");

    return { bonusesCount, hasLoyaltyCard };
  } catch (error) {
    console.error("Failed to get user bonuses", error);
    return { bonusesCount: 0, hasLoyaltyCard: false };
  }
};

export const updateOrderItemQuantityAction = async (
  productId: string,
  quantity: number,
): Promise<{ success: boolean; message: string }> => {
  try {
    const useId = await getServerUserId();
    if (!useId) return { success: false, message: "Not autorized" };

    const db = await getDB();

    const result = await db
      .collection("user")
      .updateOne(
        {
          _id: ObjectId.createFromHexString(useId),
          "cart.productId": productId,
        },
        { $set: { "cart.$.quantity": quantity } },
      );

    if (result.modifiedCount === 0) {
      return { success: false, message: "Item not found in cart" };
    }

    revalidatePath("/cart");
    return { success: true, message: "Item quantity updated" };
  } catch (error) {
    console.error("Failed to update item", error);
    return { success: false, message: "Server error" };
  }
};

export async function removeMultipleOrderItemsAction(
  productIds: string[],
): Promise<{ success: boolean; message: string }> {
    try {
        const userId = await getServerUserId();

        if(!userId){
            return {
                success: false,
                message: "Not autorized",
            };
        }

        const db = await getDB();

        const user = await db.collection('user').findOne({_id: ObjectId.createFromHexString(userId)});

        if(!user){
            return {
                success: false,
                message: "User not found",
            };
        }

        const updateCart = user.cart.filter((item:OrderCartItem)=> !productIds.includes(item.productId));

        await db.collection('user').updateOne(
            {_id: ObjectId.createFromHexString(userId)},
            {$set: {cart: updateCart}}
        )

        revalidatePath('/cart');
        return {
            success: true,
            message: "Items removed",
        }
    } catch (error) {
        console.error('Failed to remove items', error);
        return {
            success: false,
            message: "Server error",
        }
    }
}
