import { getDB } from "@/utils/api-routes";
import { NextResponse } from "next/server";


export async function GET() {
    try{
       const db = await getDB();

       const user = await db.collection("users").findOne({});
       if(!user?.purchases?.length){
            return NextResponse.json([]);
       }
       const productIds = user.purchases.map((p:{id:number})=>p.id)

       const products = await db.collection("products").find({id: {$in: productIds}}).toArray();
       return NextResponse.json(products.map((product)=>{
        const{discountPercent, ...rest} = product;
        void discountPercent;
        return rest;
       })); 
    }
    catch(e){
        console.error("Server error", e);
        return NextResponse.json({error: "Purchsed Products upload error"}, {status: 500});
    }
}