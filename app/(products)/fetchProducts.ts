
const fetchProductsByTag = async (
  tag: string,
  options?: { randomLimit?: number, pagination?: {startIndex:number, perPage:number} }
) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLICK_BASE_URL!}/api/products`);
    url.searchParams.append("tag", tag);

    if (options?.randomLimit) {
      url.searchParams.append("randomLimit", options.randomLimit.toString());
    }else if(options?.pagination){
      url.searchParams.append("startIndex", options.pagination.startIndex.toString());
      url.searchParams.append("perPage", options.pagination.perPage.toString());
    }

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch products ${tag}`);
    }
    
    const data = await res.json();
    return {items: data.products || data,
      totalCount: data.totalCount || data.length
    };
  } catch (e) {
    throw e;
  }
};

export default fetchProductsByTag;
