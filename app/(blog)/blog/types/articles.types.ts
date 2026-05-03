export interface Article {
    _id: string;
    slug: string;
    name: string;
    image?: string;
    imageAlt?: string;
    description?: string;
    publishedAt: string;
    author?: string;
    content?: string;
}

export interface ArticlesListProps{
    articles: Article[];
    categorySlug: string;
    categoryName: string;
}

export interface ArticleTitleProps{
    articleTitle: string;
    categoryName?: string;
}

export interface ArticleData{
    keywords: string[];
    _id: string | undefined;
    slug: string;
    name: string;
    content?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    publishedAt?: Date;
    createdAt: string;
    updatedAt?: string;
    status: string;
    author: string;
    views: number;
}

export interface ArticleCategory{
    _id: string;
    name: string;
    slug: string;
}

export interface ArticlePageData{
    article: ArticleData;
    category: ArticleCategory;
}

export interface ArticleMetaProps{
    categoryName: string;
    publishedAt?: Date;
    views: number;
}

export interface ArticleHeaderProps{
    articleTitle: string;
    categoryName: string;
}

export interface ArticleImageProps{
    image?: string;
    imageAlt?: string;
    articleName: string;
    hasImage?: boolean;
}

export interface RelatedArticle{
    _id: string,
    slug: string,
    name: string,
    description?: string,
    image?: string,
    imageAlt?: string,
    views: number,
    publishedAt: string,
    createdAt: string,
    author?: string,
    keywords?: string[]
}