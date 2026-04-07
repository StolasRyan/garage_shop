
import ErrorComponent from "../components/ErrorComponent";
import fetchProductsByTag from "./fetchProducts";
import ProductsSection from "./ProductsSection";
import { CONFIG } from "@/config/config";

interface SalesProos{
  randomLimit: number
}

const Sales = async ({randomLimit = CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS}:SalesProos) => {
  try {
    const {items} = await fetchProductsByTag("actions", {randomLimit});

    return (
    <ProductsSection
    title="Sales"
    viewAllButton = {{text: 'All Sales', href:'sales'}}
    products={items}     
    compact
    />);
  } catch (e) {
    return (
      <ErrorComponent
        error={e instanceof Error ? e.message : new Error(String(e))}
        userMessage="Failed to upload data about Sales"
      />
    );
  }
};

export default Sales;
