import { Article } from "./articlesListProps"
export interface ArticleSectionProps {
    title: string;
    viewAllButton: {
        text: string;
        href: string;
    };
    articles: Article[];
    compact?: boolean;
}