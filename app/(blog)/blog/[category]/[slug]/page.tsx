import { baseUrl } from "@/utils/baseUrl";
import { Metadata } from "next";
import { sanitizeArticleHTML } from "@/utils/sanitizeArticleHTML";
import ArticleHeader from "./_components/ArticleHeader";
import ArticleMeta from "./_components/ArticleMeta";
import ArticleImage from "./ArticleImage";
import ArticleAuthor from "./_components/ArticleAuthor";
import ArticleContent from "./_components/ArticleContent";
import { fetchArticlePageData } from "../utils/fetchArticle";
import { cache } from "react";
import ArticleArchiveNotice from "./_components/ArticleArchiveNotice";
import EditLink from "./_components/EditLink";
import ArticleCard from "@/app/(articles)/ArticleCard";
import { getRelatedArticles } from "../utils/getRelatedArticles";
import { CONFIG } from "@/config/config";

const cachedFetchArticleData = cache(fetchArticlePageData);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const result = await cachedFetchArticleData(category, slug);

  if ("error" in result) {
    return {
      title: "Article not found",
      description: "This article doesnt exists",
    };
  }
  const { article, category: categoryData } = result;

  const title = `${article.name}`;
  const description = article.description || article.name;
  const canonicalUrl = `${baseUrl}/blog/${categoryData.slug}/${article.slug}`;
  const keywords =
    (article?.keywords as string[]).map((k) => k.toLowerCase()) || [];

  return {
    metadataBase: new URL(`${baseUrl}/blog`),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords,
    openGraph: {
      title: article.name,
      description: description.substring(0, 200),
      type: "article",
      url: canonicalUrl,
    },
    ...(article.status === "archived" && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  };
}

const ArticlePage = async ({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) => {
  const { category, slug } = await params;

  const result = await cachedFetchArticleData(category, slug);

  if ("error" in result) {
    const error = result.error;
    if (error === "Category not found") {
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <p className="text-gray-600">Category slug:{category}</p>
        </div>
      );
    }
    if (error === "Article not found") {
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <p className="text-gray-600">Article slug: {slug}</p>
          <p className="text-gray-600">In category: {category}</p>
        </div>
      );
    }
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Upload error</h1>
        <p className="text-gray-600">Failed to upload article {error}</p>
      </div>
    );
  }

  const { article, category: categoryData } = result;

  const safeContent = sanitizeArticleHTML(article.content || "");
  const publishedDate = article.publishedAt;
  const isArchived = article.status === "archived";
  const updatedAt = article.updatedAt || article.createdAt;

  const otherArticles = await getRelatedArticles(
    categoryData._id,
    article.slug,
    CONFIG.ARTICLES_PER_ARTICLE_PAGE,
  );

  return (
    <article className="p-4 max-w-4xl mx-auto">
      {isArchived && <ArticleArchiveNotice updatedAt={updatedAt} />}
      <ArticleHeader
        articleTitle={article.name}
        categoryName={categoryData.name}
      />
      {article._id && <EditLink articleId={article._id} />}
      <ArticleMeta
        categoryName={categoryData.name}
        publishedAt={publishedDate}
        views={article.views}
      />

      <ArticleImage
        image={article.image}
        imageAlt={article.imageAlt}
        articleName={article.name}
      />
      <ArticleContent html={safeContent} />
      <ArticleAuthor author={article.author} />
      {otherArticles.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Also read
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {otherArticles.map((related) => (
          <ArticleCard
            key={related._id}
            slug={related.slug}
            categorySlug={categoryData.slug}
            categoryName={categoryData.name}
            name={related.name}
            image={related.image}
            imageAlt={related.imageAlt}
            description={related.description}
            publishedAt={related.publishedAt}
          />
        ))}
      </div>
        </div>
      )}
    </article>
  );
};

export default ArticlePage;
