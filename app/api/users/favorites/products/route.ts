import { CONFIG } from "@/config/config";
import { ProductCardProps } from "@/types/product";
import { getDB } from "@/utils/api-routes";
import { Filter, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET(request: Request) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(request.url);

    const startIndex = parseInt(searchParams.get("startIndex") || "0");
    const perPage = parseInt(
      searchParams.get("perPage") || CONFIG.ITEMS_PER_PAGE_CATEGORY.toString(),
    );

    const filters = searchParams.getAll("filter");
    const priceFrom = searchParams.get("priceFrom");
    const priceTo = searchParams.get("priceTo");
    const getPriceRangeOnly = searchParams.get("getPriceRangeOnly") === "true";
    const inStock = searchParams.get("inStock") === "true";
    const userId = searchParams.get("userId");

    if(!userId){
        return NextResponse.json({products: [], totalCount: 0})
    }

    if(getPriceRangeOnly){

        const user = await db.collection('user').findOne({_id: new ObjectId(userId)});

        const favoriteProductsIds = user?.favorites || [];

        const numberFavoritesIds = favoriteProductsIds.map((id:string)=>parseInt(id));

        if(numberFavoritesIds.length === 0){
            return NextResponse.json({
                priceRange: CONFIG.FALLBACK_PRICE_RANGE
            })
        }

          const query: Filter<ProductCardProps> = {
            id:{$in: numberFavoritesIds}
          };


      const priceRange = await db.collection<ProductCardProps>("products").aggregate([
        { $match: query },
        {$group: {
          _id: null,
          minPrice: {$min: '$basePrice'},
          maxPrice: {$max: '$basePrice'}
        }}
      ]).toArray();

      return NextResponse.json({
        priceRange:{
          min: priceRange[0]?.minPrice ?? CONFIG.FALLBACK_PRICE_RANGE.min,
          max: priceRange[0]?.maxPrice ?? CONFIG.FALLBACK_PRICE_RANGE.max
        }
      })
    }

    const user = await db.collection('user').findOne({_id: new ObjectId(userId)});

        const favoriteProductsIds = user?.favorites || [];

        const numberFavoritesIds = favoriteProductsIds.map((id:string)=>parseInt(id));

        if(numberFavoritesIds.length === 0){
            return NextResponse.json({
                priceRange: CONFIG.FALLBACK_PRICE_RANGE
            })
        }

          const query: Filter<ProductCardProps> = {
            id:{$in: numberFavoritesIds}
          };


   
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

    const actualPriceRange = products.length > 0 
    ? {min:Math.min(...products.map((p)=>p.basePrice)), max: Math.max(...products.map((p)=>p.basePrice))}
    : CONFIG.FALLBACK_PRICE_RANGE

    return NextResponse.json({ products, totalCount , priceRange:actualPriceRange});
  } catch (e) {
    console.error("Server error", e);
    return NextResponse.json(
      { error: "Products upload error" },
      { status: 500 },
    );
  }
}
