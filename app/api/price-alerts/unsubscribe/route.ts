import { unsubscribePriceAlert } from "@/actions/priceAlerts";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request:NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        console.log(`Unsubscribe API called with: ${email}, ${token}`);

        if(!token || !email){
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLICK_BASE_URL}/catalog/product/unsubscribe/error?message=Incorrect request parametrs`
            )
        }
        const result = await unsubscribePriceAlert(token);

        if(result.error){
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLICK_BASE_URL}/catalog/product/unsubscribe/error?message=${encodeURIComponent(result.error)}`
            )
        }

        return NextResponse.redirect(
            `${process.env.NEXT_PUBLICK_BASE_URL}/catalog/product/unsubscribe/success`
        )
    } catch (error) {
        console.error(`unsubscribe error: ${error}`);
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLICK_BASE_URL}/catalog/product/unsubscribe/error?message=Unsubscribe failed`
        )
    }
}