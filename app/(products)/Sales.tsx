
import ErrorComponent from "../components/ErrorComponent";
import fetchProductsByTag from "./fetchProducts";
import ProductsSection from "./ProductsSection";
import { CONFIG } from "@/config/config";

interface SalesPros{
  mobileItemsLimit?: number
}

const Sales = async ({mobileItemsLimit = 4}:SalesPros) => {
  try {
    const {items} = await fetchProductsByTag("actions", {
      pagination: {startIndex: 0, perPage: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS},
    });

    return (
    <ProductsSection
    title="Sales"
    viewAllButton = {{text: 'All Sales', href:'sales'}}
    products={items}     
    mobileItemsLimit={mobileItemsLimit}
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
