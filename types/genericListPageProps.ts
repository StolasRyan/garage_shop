import { ArticleCradProps } from "./articlesListProps";
import { ProductCardProps } from "./product";

type ContentItem = ProductCardProps | ArticleCradProps;

interface PaginatedResponse{
    items: ContentItem[];
    totalCount: number
}

export interface GenericListPageProps {
    fetchData: (options:{
        pagination: {startIndex: number, perPage: number}
}) => Promise<PaginatedResponse>;
    pageTitle?: string;
    basePath: string;
    contentType?: string;
}