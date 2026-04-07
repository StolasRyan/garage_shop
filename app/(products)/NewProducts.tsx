
import { CONFIG } from "@/config/config";
import fetchProductsByTag from "./fetchProducts";
import ProductsSection from "./ProductsSection";
import ErrorComponent from "../components/ErrorComponent";

const NewProducts = async () => {
  try {
     const {items} = await fetchProductsByTag("new",
      {randomLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS});
    
    return (
    <ProductsSection
    title="New Products"
    viewAllButton = {{text: 'All New Products', href:'new'}}
    products={items}     
    compact
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
