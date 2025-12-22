import GenericListPage from "@/app/(products)/GenericListPage";
import fetchPurchases from "../fetchPurchases";


const AllPurchases = async ({searchParams}:{searchParams: Promise<{page?: string, itemsPerPage?: string}>}) => {

  return <GenericListPage 
  searchParams={searchParams} 
  props={{
    fetchData: () => fetchPurchases(),
    pageTitle: "Bought before",
    basePath: "/purchases",
    errorMessage: "Error, failed to fetch Purchased products"
  }}
  />
};

export default AllPurchases;
