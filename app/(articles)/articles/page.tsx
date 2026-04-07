import GenericListPage from "@/app/(products)/GenericListPage";
import fetchArticles from "../fetchArticles";
import { Suspense } from "react";
import { Loader } from "@/app/components/Loader";


const AllArticles = async ({searchParams}:{searchParams: Promise<{page?: string, itemsPerPage?: string}>}) => {

  return (
    <Suspense fallback={<Loader/>}>
      <GenericListPage 
  searchParams={searchParams} 
  props={{
     fetchData: ({pagination: {startIndex, perPage}}) => fetchArticles({pagination: {startIndex, perPage}}),
    pageTitle: "All Articles",
    basePath: "/articles",
    contentType: "articles"
  }}
  />
    </Suspense>
  )
};

export default AllArticles;