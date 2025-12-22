import { shuffleArray } from "@/utils/shuffleArray";
import fetchProductsByCategory from "./fetchProducts";
import ProductsSection from "./ProductsSection";

const NewProducts = async () => {
  try {
    let products = await fetchProductsByCategory("new");
    products = shuffleArray(products)
    return (
    <ProductsSection
    title="New Products"
    viewAllButton = {{text: 'All New Products', href:'new'}}
    products={products}     
    compact
    />);
  } catch {
    return (
      <div className="text-red-500">Error, failed to fetch SALE products</div>
    );
  }
};

export default NewProducts;
