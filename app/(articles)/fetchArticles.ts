

const fetchArticles = async (options?:{articlesLimit?: number; pagination?: {startIndex:number, perPage:number}}) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLICK_BASE_URL!}/api/articles`);


    if (options?.articlesLimit) {
      url.searchParams.append("articlesLimit", options.articlesLimit.toString());
    }else if(options?.pagination){
      url.searchParams.append("startIndex", options.pagination.startIndex.toString());
      url.searchParams.append("perPage", options.pagination.perPage.toString());
    }

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    const data = await res.json();
    return {items: data.articles || data,
      totalCount: data.totalCount || data.length
    };
  } catch (e) {
    console.error("Articles error", e);
    throw e;
  }
};

export default fetchArticles;
