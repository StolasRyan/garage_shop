import { CONFIG } from "@/config/config";
import { getDB } from "@/utils/api-routes";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const db = await getDB();
    const url = new URL(request.url);

    const articlesLimit = url.searchParams.get("articlesLimit");
    const startIndex = parseInt(url.searchParams.get("startIndex") || "0");
    const perPage = parseInt(
      url.searchParams.get("perPage") || CONFIG.ITEMS_PER_PAGE_MAIN_ARTICLES.toString()
    );


    if (articlesLimit) {
      const limit = parseInt(articlesLimit);
      const articles = await db
        .collection("articles")
        .find()
        .sort({createdAt: -1})
        .limit(limit )
        .toArray();
      return NextResponse.json(articles);
    }

    const totalCount = await db.collection("articles").countDocuments();

    const articles = await db
      .collection("articles")
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(perPage)
      .toArray();

    return NextResponse.json({ articles, totalCount });
  } catch (e) {
    console.error("Server error", e);
    return NextResponse.json(
      { error: "Articles upload error" },
      { status: 500 }
    );
  }
}
