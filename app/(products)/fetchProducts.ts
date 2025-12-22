import { ProductCardProps } from "@/types/product";


const fetchProductsByCategory = async (category: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLICK_BASE_URL!}/api/products?category=${category}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch products${category}`);
    }

    const products: ProductCardProps[] = await res.json();
    const availebelProducts = products.filter(
      (product) => product .quantity > 0
    )
    return availebelProducts;
  } catch (e) {
    console.error("Sales products error", e);
    throw e;
  }
};

export default fetchProductsByCategory;
