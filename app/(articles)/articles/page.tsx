import GenericListPage from "@/app/(products)/GenericListPage";
import fetchArticles from "../fetchArticles";


const AllArticles = async ({searchParams}:{searchParams: Promise<{page?: string, itemsPerPage?: string}>}) => {

  return <GenericListPage 
  searchParams={searchParams} 
  props={{
    fetchData: () => fetchArticles(),
    pageTitle: "All Articles",
    basePath: "/articles",
    errorMessage: "Error, failed to fetch Articles",
    contentType: "articles"
  }}
  />
};

export default AllArticles;