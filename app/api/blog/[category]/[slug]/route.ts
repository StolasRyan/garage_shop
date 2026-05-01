import { getDB } from "@/utils/api-routes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request:NextRequest,
    { params }: { params: Promise<{ category: string; slug: string }> }
) {
    try {
        const { category, slug } = await params;

        const db = await getDB();

        const categoryDoc = await db.collection("article-category").findOne({slug:category});

        if(!categoryDoc){
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 },
            );
        };

        const articleDoc = await db.collection("articles").findOne({
            categoryId: categoryDoc._id.toString(),
            slug: slug,
            status: "published",
        });

        if(!articleDoc){
            return NextResponse.json(
                { error: "Article not found" },
                { status: 404 },
            );
        }

        const result = await db.collection("articles").findOneAndUpdate(
            {_id: articleDoc._id},
            {$inc: {views: 1}},
            {returnDocument: "after",
                projection:{
                    _id:1,
                    slug:1,
                    name:1,
                    keywords:1,
                    image:1,
                    imageAlt:1,
                    content:1,
                    description:1,
                    publishedAt:1,
                    author:1,
                    views:1,
                    categoryName:1,
                    categorySlug:1,
                }
            }
        );

        if(!result){
            return NextResponse.json(
                { error: "Failed to update views" },
                { status: 500 },
            );
        };

        const updatedArticle = result;

        const categoryData = {
            _id: categoryDoc._id.toString(),
            name: categoryDoc.name,
            slug: categoryDoc.slug,
            description: categoryDoc.description,
            image: categoryDoc.image,
            imageAlt: categoryDoc.imageAlt,
            keywords: categoryDoc.keywords,
        };

        const article = {
            _id: updatedArticle._id.toString(),
            slug: updatedArticle.slug,
            name: updatedArticle.name,
            keywords: updatedArticle.keywords,
            image: updatedArticle.image,
            imageAlt: updatedArticle.imageAlt,
            description: updatedArticle.description,
            content: updatedArticle.content,
            publishedAt: updatedArticle.publishedAt,
            author: updatedArticle.author,
            views: updatedArticle.views || 0,
        };

        return NextResponse.json({
            article,
            category: categoryData,
        });
        
    } catch (error) {
        console.error(`Failed to fetch artcles category: ${error}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}