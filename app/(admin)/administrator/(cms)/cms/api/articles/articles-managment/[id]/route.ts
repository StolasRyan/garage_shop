import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const {id} = await params;
        const db = await getDB();

        if(!ObjectId.isValid(id)){
            return NextResponse.json(
                {success: false, message: "Invalid article ID"},
                {status: 400}
            )
        }

        const article = await db.collection('articles').findOne({_id: new ObjectId(id)});

        if(!article){
            console.error("Article not found", id);
            return NextResponse.json(
                {success: false, message: "Article not found"},
                {status: 404}
            )
        }

        return NextResponse.json(
            {success: true, data: {
                ...article,
                _id: article._id.toString()
            }},
            {status: 200}
        )
    } catch (error) {
        console.error("Error loading article", error);
        return NextResponse.json(
            {success: false, message: "Failed to load article"},
            {status: 500}
        )
    }
}