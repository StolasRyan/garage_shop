import { Article, Category } from "@/app/(blog)/blog/types";
import { getDB } from "@/utils/api-routes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  reqest: NextRequest,
  { params }: { params: Promise<{ category: string }> },
) {
    try {
        const {category: categorySlug} = await params;
        const searchParams = reqest.nextUrl.searchParams;

        const page = parseInt(searchParams.get("page") || "1");
        const itemsPerPage = parseInt(searchParams.get("itemsPerPage")!);
        const skip = (page - 1) * itemsPerPage;

        const db = await getDB();

        const categoryDoc = await db.collection("article-category").findOne({slug:categorySlug });

        if(!categoryDoc){
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 },
            );
        }

        const totalArticles = await db.collection('articles').countDocuments({
            categoryId: categoryDoc._id.toString(),
            status: 'published'
        });

        const articles = await db.collection('articles').find(
            {
                categoryId: categoryDoc._id.toString(),
                status: 'published'
            },
            {
                projection:{
                    _id: 1,
                    slug: 1,
                    name: 1,
                    image: 1,
                    imageAlt: 1,
                    description: 1,
                    publishedAt: 1,
                    isFeatured: 1
                }
            }
        ).sort({isFeatured: -1,publishedAt: -1}).skip(skip).limit(itemsPerPage).toArray();

        const totalPages = Math.ceil(totalArticles / itemsPerPage);

        const category:Category ={
            _id: categoryDoc._id.toString(),
            name: categoryDoc.name,
            slug: categoryDoc.slug,
            description: categoryDoc.description,
            image: categoryDoc.image,
            imageAlt: categoryDoc.imageAlt,
            keywords: categoryDoc.keywords,
        };

        const articlesData: Article[] = articles.map((article)=>({
            _id: article._id.toString(),
            slug: article.slug,
            name: article.name,
            image: article.image,
            imageAlt: article.imageAlt,
            description: article.description,
            publishedAt: article.publishedAt,
            isFeatured: article.isFeatured
        }))

        return NextResponse.json({
            category,
            articles: articlesData,
            totalArticles,
            totalPages,
            currentPage: page,
            itemsPerPage
        })
    } catch (error) {
        console.error("Failed to get blog articles", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
