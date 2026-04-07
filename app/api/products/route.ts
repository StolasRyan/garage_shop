import { CONFIG } from "@/config/config";
import { getDB } from "@/utils/api-routes";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const db = await getDB();
    const url = new URL(request.url);
    const tag = url.searchParams.get("tag");
    const randomLimit = url.searchParams.get("randomLimit");
    const startIndex = parseInt(url.searchParams.get("startIndex") || "0");
    const perPage = parseInt(
      url.searchParams.get("perPage ") || CONFIG.ITEMS_PER_PAGE.toString()
    );

    if (!tag) {
      return NextResponse.json(
        { message: "Category parameter REQUIRED" },
        { status: 400 }
      );
    }

    const query = {
      tags: tag,
      quantity: { $gt: 0 },
    };

    if (randomLimit) {
      const pipeline = [
        { $match: query },
        { $sample: { size: parseInt(randomLimit) } },
      ];
      const products = await db
        .collection("products")
        .aggregate(pipeline)
        .toArray();
      return NextResponse.json(products);
    }

    const totalCount = await db.collection("products").countDocuments(query);

    const products = await db
      .collection("products")
      .find(query)
      .sort({ _id: 1 })
      .skip(startIndex)
      .limit(perPage)
      .toArray();

    return NextResponse.json({ products, totalCount });
  } catch (e) {
    console.error("Server error", e);
    return NextResponse.json(
      { error: "Products upload error" },
      { status: 500 }
    );
  }
}
