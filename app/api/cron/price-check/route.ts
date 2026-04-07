import { checkPriceAlerts } from "@/scripts/checkPriceAlerts";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    try {
        const secret = request.nextUrl.searchParams.get('secret');
        if(secret !== process.env.CRON_SECRET){
            return NextResponse.json({error: "Unautorize"}, {status:401})
        };

        await checkPriceAlerts();

        return NextResponse.json({
            success: true,
            message: 'Coast check finished'
        })
    } catch (error) {
        console.error(`Coast checking error: ${error}`)
        return NextResponse.json(
            {error: 'Failed to check prices'},
            {status: 500}
        )
    }
}