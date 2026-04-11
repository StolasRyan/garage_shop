
import { CONFIG } from "@/config/config";
import fetchProductsByTag from "./fetchProducts";
import ProductsSection from "./ProductsSection";
import ErrorComponent from "../components/ErrorComponent";

const NewProducts = async () => {
  try {
     const {items} = await fetchProductsByTag("new",
      {pagination: {startIndex: 0, perPage: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS}});
    
    return (
    <ProductsSection
    title="New Products"
    viewAllButton = {{text: 'All New Products', href:'new'}}
    products={items}     
    />);
  } catch (e) {
    return (
      <ErrorComponent
        error={e instanceof Error ? e.message : new Error(String(e))}
        userMessage="Failed to upload data about new products"
      />
    );
  }
};

export default NewProducts;
