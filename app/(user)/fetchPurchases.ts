
const fetchPurchases = async (
  options?: { userPurchsesLimit?: number, pagination?: {startIndex:number, perPage:number} }
) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLICK_BASE_URL!}/api/users/purchases`);


    if (options?.userPurchsesLimit) {
      url.searchParams.append("userPurchsesLimit ", options.userPurchsesLimit.toString());
    }else if(options?.pagination){
      url.searchParams.append("startIndex", options.pagination.startIndex.toString());
      url.searchParams.append("perPage", options.pagination.perPage.toString());
    }

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error('Failed to fetch ypurs Purchases');
    }
    
    const data = await res.json();
    return {items: data.products || data,
      totalCount: data.totalCount || data.length
    };
  } catch (e) {
    throw e;
  }
};

export default fetchPurchases;
