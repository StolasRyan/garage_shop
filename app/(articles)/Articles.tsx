import { CONFIG } from "@/config/config";
import ArticleSection from "./ArticleSection";
import fetchArticles from "./fetchArticles";
import ErrorComponent from "../components/ErrorComponent";

const Articles = async () => {
  try {
    const {items} = await fetchArticles({articlesLimit: CONFIG.ITEMS_PER_PAGE_MAIN_ARTICLES});
    return (
      <ArticleSection
        title="Articles"
        viewAllButton={{ text: "All Articles", href: "blog" }}
        articles={items}
        compact
      />
    );
  } catch (e){
    return <ErrorComponent error={e instanceof Error ? e.message : new Error(String(e))} userMessage="Articles error"/>
  }
};

export default Articles;
