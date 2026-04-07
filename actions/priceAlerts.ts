'use server'

import { getDB } from "@/utils/api-routes";
import { randomBytes } from "crypto";

export interface PriceAlertFormState{
    errors?:{
        email?: string,
        general?: string
    };
    success?: boolean;
    unsubscribeToken?:string
};

export async function createPriceAlert(
    _prevState: PriceAlertFormState | null,
    formData : FormData
):Promise<PriceAlertFormState> {
    try{
        const db = await getDB();
        const productId = formData.get('productId') as string;
        const productTitle = formData.get('productTitle') as string;
        const email = formData.get('email') as string;
        const currentPrice = Number(formData.get('currentPrice'));

        if(!email.trim()){
            return {errors:{email:'E-mail required'}}
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return {errors:{email:'Enter correct E-mail'}}
        }

        const existingAlert = await db.collection("priceAlerts").findOne({
            productId,
            email
        });

        if(existingAlert){
            return {
                errors :{email: 'You are alredy subscribed on this product price change'}
            }
        }
        const unsubscribeToken = randomBytes(32).toString('hex')

        await db.collection("priceAlerts").insertOne({
            email,
            productId,
            productTitle,
            unsubscribeToken,
            createdAt: new Date()
        });

        return {success: true, unsubscribeToken}
    }catch(error){
        console.error(`Failed to create subscribe: ${error}`);
        return {errors:{general: 'Error in subscribe action'}}
    }
}

export async function unsubscribePriceAlert(token:string):Promise<{success?: boolean, error?: string}> {
    try {
        const db = await getDB();

        const result = await db.collection("priceAlerts").deleteOne({
            unsubscribeToken: token
        });

        if(result.deletedCount === 0){
            return {error: 'Cannot find subscribe'}
        }

        return {success:true}
    } catch (error) {
        console.error(`Unsubscribe error: ${error}`);
        return {error: 'Failed to unsubscribe'}
    }
}