
export type ArticleStatus = "published" | "archived" | "draft" | "deleted";

export interface Article {
    _id: string;
    numericId: number;
    name: string;
    slug: string;
    description: string;
    keywords: string[];
    image: string;
    imageAlt: string;
    author: string;
    categoryId: string;
    categoryName: string;
    categorySlug: string;
    content: string;
    isFeatured: boolean;
    status: ArticleStatus;
    views: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}


