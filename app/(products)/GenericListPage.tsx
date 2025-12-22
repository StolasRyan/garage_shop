import { GenericListPageProps } from "@/types/genericListPageProps";
import ProductsSection from "./ProductsSection";
import { CONFIG } from "@/config/config";
import PaginationWrapper from "../components/PaginationWrapper";
import ArticleSection from "../(articles)/ArticleSection";
import { ArticleCradProps } from "@/types/articlesListProps";
import { ProductCardProps } from "@/types/product";

const GenericListPage = async ({
  searchParams,
  props,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
  props: GenericListPageProps;
}) => {
  const params = await searchParams;
  const page = params?.page;
  const itemsPerPage = params?.itemsPerPage || CONFIG.ITEMS_PER_PAGE;
  const currentPage = Number(page) || 1;
  const perPage = Number(itemsPerPage);
  const startIndex = (currentPage - 1) * perPage;

  try {
    const items = await props.fetchData();
    const paginatedItems = items.slice(startIndex, startIndex + perPage);
    return (
      <>
        {!props.contentType ? (
          <ProductsSection
            title={props.pageTitle}
            viewAllButton={{ text: "Main", href: "/" }}
            products={paginatedItems as ProductCardProps[]}
          />
        ) : (
          <ArticleSection
            title={props.pageTitle}
            viewAllButton={{ text: "Main", href: "/" }}
            articles={paginatedItems as ArticleCradProps[]}
          />
        )}

        {items.length > perPage && (
          <PaginationWrapper
            totalItems={items.length}
            basePath={props.basePath}
            currentPage={currentPage}
            contentType={props.contentType}
          />
        )}
      </>
    );
  } catch {
    return <div className="text-red-500">{props.errorMessage}</div>;
  }
};

export default GenericListPage;
