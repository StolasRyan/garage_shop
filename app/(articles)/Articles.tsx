import ArticleSection from "./ArticleSection";
import fetchArticles from "./fetchArticles";

const Articles = async () => {
  try {
    const articles = await fetchArticles();
    return (
      <ArticleSection
        title="Articles"
        viewAllButton={{ text: "All Articles", href: "articles" }}
        articles={articles}
        compact
      />
    );
  } catch {
    return <div className="text-red-500">Error to find articles</div>;
  }
};

export default Articles;
