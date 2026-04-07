import GenericListPage from "@/app/(products)/GenericListPage";
import fetchPurchases from "../fetchPurchases";
import { Suspense } from "react";
import { Loader } from "@/app/components/Loader";


const AllPurchases = async ({searchParams}:{searchParams: Promise<{page?: string, itemsPerPage?: string}>}) => {

  return (
    <Suspense fallback={<Loader/>}>
      <GenericListPage 
  searchParams={searchParams} 
  props={{
     fetchData: ({pagination: {startIndex, perPage}}) => fetchPurchases ( {pagination: {startIndex, perPage}}),
    pageTitle: "Bought before",
    basePath: "/purchases"
  }}
  />
    </Suspense>
  )
};

export default AllPurchases;
