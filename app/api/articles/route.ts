import { getDB } from "@/utils/api-routes";
import { NextResponse } from "next/server";
export const revalidate = 3600;

export async function GET(){
    try{
        const db = await getDB();
        const articles = await db.collection("articles").find().toArray( );
        return NextResponse.json(articles); 
    }
    catch(e){
        console.error("Server error", e);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}