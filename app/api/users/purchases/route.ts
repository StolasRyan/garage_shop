import { CONFIG } from "@/config/config";
import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const db = await getDB();

    const url = new URL(request.url);

    const userId = url.searchParams.get("userId");

    if(!userId){
        return NextResponse.json({products: [], totalCount: 0})
    }

    const userPurchasesLimit = url.searchParams.get("userPurchasesLimit");
    const startIndex = parseInt(url.searchParams.get("startIndex") || "0");
    const perPage = parseInt(
      url.searchParams.get("perPage ") || CONFIG.ITEMS_PER_PAGE.toString(),
    );

    const user = await db.collection("user").findOne({
        _id: ObjectId.createFromHexString(userId),
    })

    if (!user?.purchases?.length) {
      return NextResponse.json({ products: [], totalCount: 0 });
    }

    const productIds = user.purchases;

    if (userPurchasesLimit) {
      const limit = parseInt(userPurchasesLimit);

      const purchases = await db
        .collection("products")
        .find({ id: { $in: productIds } })
        .limit(limit)
        .toArray();

      return NextResponse.json(
        purchases.map((product) => {
          const { discountPercent, ...rest } = product;
          void discountPercent;
          return rest;
        }),
      );
    }

    const totalCount = productIds.length;

    const purchases = await db
      .collection("products")
      .find({ id: { $in: productIds } })
      .sort({ _id: -1 })
      .skip(startIndex)
      .limit(perPage)
      .toArray();
    return NextResponse.json({
      products: purchases.map((product) => {
        const { discountPercent, ...rest } = product;
        void discountPercent;
        return rest;
      }),
      totalCount,
    });
  } catch (e) {
    console.error("Server error", e);
    return NextResponse.json(
      { error: "Purchsed Products upload error" },
      { status: 500 },
    );
  }
}
