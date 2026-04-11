import { GenericListPageProps } from "@/types/genericListPageProps";
import ProductsSection from "./ProductsSection";
import { CONFIG } from "@/config/config";
import PaginationWrapper from "../components/PaginationWrapper";
import ArticleSection from "../(articles)/ArticleSection";
import { ArticleCradProps } from "@/types/articlesListProps";
import { ProductCardProps } from "@/types/product";
import ErrorComponent from "../components/ErrorComponent";

const GenericListPage = async ({
  searchParams,
  props,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
  props: GenericListPageProps;
}) => {
  const params = await searchParams;
  const page = params?.page;

const defaultItemsPerPage = props.contentType === "category" ? CONFIG.ITEMS_PER_PAGE_CATEGORY : CONFIG.ITEMS_PER_PAGE;

  const itemsPerPage = params?.itemsPerPage || defaultItemsPerPage;
  const currentPage = Number(page) || 1;
  const perPage = Number(itemsPerPage);
  const startIndex = (currentPage - 1) * perPage;

  try {
    const {items, totalCount} = await props.fetchData({pagination: {startIndex, perPage}});
    const totalPages = Math.ceil(totalCount/perPage)
 
    return (
      <>
        {!props.contentType || props.contentType === "category" ? (
          <ProductsSection
            title={props?.pageTitle}
            products={items as ProductCardProps[]}
            applyIndexStyles={props.contentType === "category" ? false : true}
            contentType={props.contentType}
          />
        ) : (
          <ArticleSection
            title={props.pageTitle || ''}
            articles={items as ArticleCradProps[]}
          />
        )}

        {totalPages > 1 && (
          <PaginationWrapper
            totalItems={totalCount}
            basePath={props.basePath}
            currentPage={currentPage}
            contentType={props.contentType}
          />
        )}
      </>
    );
  } catch (e) {
    return (
      <ErrorComponent
        error={e instanceof Error ? e.message : new Error(String(e))}
        userMessage="Failed to upload data about product"
      />
    );
  }
};

export default GenericListPage;
