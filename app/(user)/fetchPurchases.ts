import 'dotenv/config';

const fetchPurchases = async (options?: {
  userPurchsesLimit?: number;
  pagination?: { startIndex: number; perPage: number };
  userId?: string;
}) => {
  try {

    
    //const url = new URL(`${process.env.NEXT_PUBLICK_BASE_URL}/api/users/purchases`);
    const url = new URL(`http://localhost:3000/api/users/purchases`);

    if (options?.userPurchsesLimit) {
      url.searchParams.append(
        "userPurchsesLimit ",
        options.userPurchsesLimit.toString(),
      );
    } else if (options?.pagination) {
      url.searchParams.append(
        "startIndex",
        options.pagination.startIndex.toString(),
      );
      url.searchParams.append("perPage", options.pagination.perPage.toString());
    }
    if (options?.userId) {
      url.searchParams.append("userId", options.userId);
    }

    console.log(url);
    

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error("Failed to fetch yours Purchases");
    }

    const data = await res.json();
    console.log(data);

    return {
      items: data.products || data,
      totalCount: data.totalCount || data.length,
    };
  } catch (e) {
    throw e;
  }
};

export default fetchPurchases;
