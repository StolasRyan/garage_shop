import { getDB } from "@/utils/api-routes";
import { NextResponse } from "next/server";
export const revalidate = 3600;

export async function GET(request: Request) {
    try{
        const category = new URL(request.url).searchParams.get("category");

        if(!category){
            return NextResponse.json(
                {message: "Category paramer REQUIRED"},
                {status: 400}
            )
        }

        const products = await (await getDB()).collection('products').find({categories: category}).toArray();

        return NextResponse.json(products); 
    }
    catch(e){
        console.error("Server error", e);
        return NextResponse.json({error: "Products upload error"}, {status: 500});
    }
}