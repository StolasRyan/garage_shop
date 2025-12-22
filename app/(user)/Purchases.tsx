import ProductsSection from "../(products)/ProductsSection";
import fetchPurchases from "./fetchPurchases";

const Purchaes = async () => {
  try {
    const purchases = await fetchPurchases();
    return (
      <ProductsSection
        title="Purchases"
        viewAllButton={{ text: "Purchased before", href: "purchases" }}
        products={purchases}
        compact
      />
    );
  } catch  {
    return (
      <div className="text-red-500">Error, failed to fetch Purchased products</div>
    );
  }
};

export default Purchaes;
