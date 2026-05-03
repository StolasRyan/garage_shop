import { getDB } from "@/utils/api-routes";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const query = searchParams.get("q")?.trim();

        if(!query || query?.length < 3){
            return NextResponse.json(
                {error: "Incorrect request parametrs, 3 or more symbols required"},
                {status: 400}
            )
        }

        const db = await getDB();
        
        const articles = await db.collection('articles')
        .find({
            $and: [
                {status: {$in:["published", "archived"]}},
                {
                    $or:[
                        {name: {$regex: query, $options: 'i'}},
                        {description: {$regex: query, $options: 'i'}},
                        {content: {$regex: query, $options: 'i'}}
                    ]
                }
            ]
        }).project({
            _id:1,
            name:1,
            slug:1,
            description:1,
            image:1,
            imageAlt:1,
            publishedAt:1,
            categoryId:1,
            categoryName:1,
            categorySlug:1,
        }).sort({publishedAt: -1}).limit(20).toArray();

        const articlesData = articles.map((article)=>{
            return {
                _id: article._id.toString(),
                slug: article.slug,
                name: article.name,
                image: article.image,
                imageAlt: article.imageAlt,
                description: article.description,
                publishedAt: article.publishedAt,
                category: article.categorySlug ? {
                    _id: article.categoryId.toString(),
                    name: article.categoryName,
                    slug: article.categorySlug
                } : null
            }
        });

        return NextResponse.json({
            articles: articlesData,
            count: articles.length,
            query
        });

    } catch (error) {
        console.error("Error in search API:", error);
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        )
    }
}