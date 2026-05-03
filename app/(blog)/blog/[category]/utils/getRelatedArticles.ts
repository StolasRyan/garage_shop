import { CONFIG } from "@/config/config";
import { ObjectId } from "mongodb";
import { RelatedArticle } from "../../types";
import { getDB } from "@/utils/api-routes";

export async function getRelatedArticles(
  categoryId: ObjectId | string,
  excludeSlug: string,
  limit: number = CONFIG.ARTICLES_PER_ARTICLE_PAGE,
): Promise<RelatedArticle[]> {
  try {
    const db = await getDB();

    const articles = await db
      .collection<RelatedArticle>("articles")
      .find(
        {
          categoryId:
            typeof categoryId === "string" ? categoryId : categoryId.toString(),
          slug: { $ne: excludeSlug },
          status: { $in: ["published"] },
        },
        {
          projection: {
            _id: 1,
            name: 1,
            slug: 1,
            description: 1,
            image: 1,
            imageAlt: 1,
            views: 1,
            publishedAt: 1,
            createdAt: 1,
            author: 1,
            keywords: 1,
          },
        },
      )
      .sort({ publishedAt: -1 })
      .limit(limit)
      .toArray();

      return articles.map((article):RelatedArticle=>({
        ...article,
        _id: article._id.toString(),
        publishedAt: article.publishedAt as string,
        createdAt: article.createdAt as string
      }));
  } catch (error) {
    console.error('Error fetching related articles', error);
    return [];
  }
}
