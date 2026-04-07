import { ArticleCradProps } from "./articlesListProps"
export interface ArticleSectionProps {
    title: string;
    viewAllButton?: {
        text: string;
        href: string;
    };
    articles: ArticleCradProps[];
    compact?: boolean;
}