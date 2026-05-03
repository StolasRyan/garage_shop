import { getDB } from "@/utils/api-routes";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getDB();

    const publishedCount = await db
      .collection("articles")
      .countDocuments({ status: {$in:["published", "archived"]} });

    const articles = await db
      .collection("articles")
      .find({}, { projection: { views: 1 } })
      .toArray();

    let totalViews = 0;
    for (const article of articles) {
      totalViews += article.views;
    }

    return NextResponse.json({ publishedCount, totalViews });
  } catch (error) {
    console.error("Failed to get stats", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
