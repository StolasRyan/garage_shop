import { ArticleCradProps } from "./articlesListProps";
import { ProductCardProps } from "./product";

type ContentItem = ProductCardProps | ArticleCradProps

export interface GenericListPageProps {
    fetchData: () => Promise<ContentItem[]>;
    pageTitle: string;
    basePath: string;
    errorMessage: string;
    contentType?: 'articles'
}