import { Article } from "../../models";

export interface ArticleTableProps {
  onReorder?: (reorderedCategories: Article[]) => void;
}

export type SortField =
  | "numericId"
  | "name"
  | "slug"
  | "categoryName"
  | "isFeatured"
  | "status"
  | "createdAt"
  | "author"
  | "views";

export type SortDirection = "asc" | "desc";

export type FilterType =
  | "all"
  | "name"
  | "slug"
  | 'content'
  | 'category'
  | "author"
  | "description"
  | "keywords";
