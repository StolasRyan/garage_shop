import { getDB } from "@/utils/api-routes";
import { NextResponse } from "next/server";



export async function POST(request: Request){
    try {
        const {phoneNumber} = await request.json(); 
        const db = await getDB();

        const user = await db.collection('user').findOne({phoneNumber});
        if(!user){
            return NextResponse.json({exists: false})
        }

        return NextResponse.json({exists: true, userName: user.name})
    } catch (error) {
        console.error('Error while checking phone number', error);
        return NextResponse.json({
            error: "Server Error "
        }, {status: 500}) 
    }
}