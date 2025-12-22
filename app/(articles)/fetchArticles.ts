import { Article } from "@/types/articlesListProps";


const fetchArticles = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLICK_BASE_URL!}/api/articles`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch Articles`);
    }

    const articles:Article[] = await res.json();
    return articles;
   
    
  } catch (e) {
    console.error("Failed to fetch Articles", e);
    throw e;
  }
};

export default fetchArticles;
