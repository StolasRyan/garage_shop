import { shuffleArray } from "@/utils/shuffleArray";
import fetchProductsByCategory from "./fetchProducts";
import ProductsSection from "./ProductsSection";


const Sales = async () => {
  try {
    let products = await fetchProductsByCategory("actions");
    products = shuffleArray(products)
    return (
    <ProductsSection
    title="Sales"
    viewAllButton = {{text: 'All Sales', href:'sales'}}
    products={products}     
    compact
    />);
  } catch {
    return (
      <div className="text-red-500">Error, failed to fetch SALE products</div>
    );
  }
};

export default Sales;
