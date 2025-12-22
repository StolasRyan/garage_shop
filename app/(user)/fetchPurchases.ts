import { ProductCardProps } from "@/types/product";


const fetchPurchases = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLICK_BASE_URL!}/api/users/purchases`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch Purchases`);
    }

    const purchases: ProductCardProps[] = await res.json();
    return purchases;
  } catch (e) {
    console.error("Sales purchases error", e);
    throw e;
  }
};

export default fetchPurchases;
