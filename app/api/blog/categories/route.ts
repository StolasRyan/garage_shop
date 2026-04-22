import { BlogCategory } from "@/app/(blog)/blog/categories/types/categories.types";
import { getDB } from "@/utils/api-routes";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db = await getDB();
        const categories = await db.collection<BlogCategory>('article-category').find({}).sort({createdAt: -1}).toArray();

        return NextResponse.json({
            success: true,
            data: categories,
        })
    } catch (error) {
        console.error("Failed to get blog articles", error);
        return NextResponse.json(
            { success: false, message: "Failed to get blog articles" },
            { status: 500 },
        );
    }
}