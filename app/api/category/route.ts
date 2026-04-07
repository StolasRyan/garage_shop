import { CONFIG } from "@/config/config";
import { ProductCardProps } from "@/types/product";
import { getDB } from "@/utils/api-routes";
import { Filter } from "mongodb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const startIndex = parseInt(searchParams.get("startIndex") || "0");
    const perPage = parseInt(
      searchParams.get("perPage ") || CONFIG.ITEMS_PER_PAGE_CATEGORY.toString(),
    );

    const filters = searchParams.getAll("filter");
    const priceFrom = searchParams.get("priceFrom");
    const priceTo = searchParams.get("priceTo");
    const getPriceRangeOnly = searchParams.get("getPriceRangeOnly") === "true";
    const inStock = searchParams.get("inStock") === "true";

    

    const query: Filter<ProductCardProps> = {};

    if (!category) {
      return NextResponse.json(
        { message: "Category parameter REQUIRED" },
        { status: 400 },
      );
    }

    if(getPriceRangeOnly){
      const categoryOnlyQuery: Filter<ProductCardProps> = {}
      categoryOnlyQuery.categories = { $in: [category] };

      const priceRange = await db.collection<ProductCardProps>("products").aggregate([
        { $match: categoryOnlyQuery },
        {$group: {
          _id: null,
          minPrice: {$min: '$basePrice'},
          maxPrice: {$max: '$basePrice'}
        }}
      ]).toArray();

      return NextResponse.json({
        priceRange:{
          min: priceRange[0]?.minPrice ?? 0,
          max: priceRange[0]?.maxPrice ?? CONFIG.FALLBACK_PRICE_RANGE
        }
      })
    }

    if (category) {
      query.categories = { $in: [category] };
    }

    if (inStock) {
      query.quantity = { $gt: 0 };
    }

    if (filters.length > 0) {
      query.$and = query.$and || [];

      if (filters.includes("our-production")) {
        query.$and.push({ manufacturer: 'Russia' });
      }
      if (filters.includes("healthy-food")) {
        query.$and.push({ isHealthyFood: true });
      }
      if (filters.includes("non-gmo")) {
        query.$and.push({ isNonGMO: true });
      }
    }

    if(priceFrom || priceTo){
      query.basePrice = {};
      if(priceFrom) query.basePrice.$gte = parseInt(priceFrom);
      if(priceTo) query.basePrice.$lte = parseInt(priceTo);

    }

    const [totalCount, products] = await Promise.all([
      db.collection<ProductCardProps>("products").countDocuments(query),
      db
        .collection<ProductCardProps>("products")
        .find(query)
        .sort({ _id: 1 })
        .skip(startIndex)
        .limit(perPage)
        .toArray(),
    ]);

    return NextResponse.json({ products, totalCount , priceRange:{min:0 , max:0}});
  } catch (e) {
    console.error("Server error", e);
    return NextResponse.json(
      { error: "Products upload error" },
      { status: 500 },
    );
  }
}
