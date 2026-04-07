"use server";
// import { getBonusesWord } from "@/utils/bonusWord";
// import { formatPrice } from "@/utils/formatPrice";
// import { CONFIG } from "@/config/config";
import { CartItem } from "@/types/cart";
import { getDB } from "@/utils/api-routes";
import { getServerUserId } from "@/utils/getServerUserId";
import { ObjectId } from "mongodb";
export async function addToCartAction(
  productId: string,
): Promise<{ success: boolean; message: string; loyaltyPrice?: number }> {
  try {
    if (!productId) {
      return {
        success: false,
        message: "Product not found",
      };
    }

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

    const productIdNumber = parseInt(productId);

    const product = await db.collection('products').findOne({id: productIdNumber});

    if(!product){
        return {
            success: false,
            message: "Product not found",
        };
    }

    // const discountPercent = product.discountPercent || 0;
    // const basePrice = product.basePrice || 0;

    // const priceWithDiscount = Math.round(basePrice *(1-discountPercent/100)*100)/100;

    // const hasLoayaltyCard = user.card && user.card !== '';

    const cartItems:CartItem[] = user.cart || [];

    const existingCartItem = cartItems.find((item:CartItem)=>item.productId === productId);

    if(existingCartItem){
        return{
            success: false,
            message: "",
        }
    }

    // const calculateBonuses = Math.round((priceWithDiscount * CONFIG.BONUSES_PERCENT) / 100);

    // let loyaltyPrice: number | undefined;
    // let loyaltyDiscountApplied = false;

    // if(hasLoayaltyCard){
    //     const cardDiscountPercent = CONFIG.CARD_DISCOUNT_PERCENT;
    //     loyaltyPrice = Math.round(priceWithDiscount * (1 - cardDiscountPercent / 100) * 100) / 100;
    //     loyaltyDiscountApplied = true;
    // }

    const productQuantity = product.quantity || 0;
    const initialQuantity = productQuantity > 0 ? 1 : 0;

    const newCartItem: CartItem = {
        productId,
        quantity: initialQuantity,
        addedAt:new Date(),
    }

    const newCartItems = [...cartItems, newCartItem];

    await db.collection('user').updateOne(
        {_id: ObjectId.createFromHexString(userId)},
        {$set:{cart: newCartItems}}
    );

    // let successMessage = "Product added to cart";

    // if(loyaltyDiscountApplied && loyaltyPrice){
    //     const discountAmount = priceWithDiscount - loyaltyPrice;
    //     const cardDiscountPercent = CONFIG.CARD_DISCOUNT_PERCENT;
    //     successMessage += ` (discount by card ${cardDiscountPercent}%: -${formatPrice(discountAmount)} ₽)`;
    // }

    // const bonusesWord = getBonusesWord(calculateBonuses);
    // successMessage += `. You will get ${calculateBonuses} ${bonusesWord}!`;

    // const result:{success: boolean, message: string, loyaltyPrice?: number} = {success:true, message:successMessage};

    // if(hasLoayaltyCard && loyaltyPrice){
    //     result.loyaltyPrice = loyaltyPrice;
    // }
    return {
        success: true,
        message: ''
    };

  } catch  {
    return {
      success: false,
      message: "Server error",
    };
  }
}
