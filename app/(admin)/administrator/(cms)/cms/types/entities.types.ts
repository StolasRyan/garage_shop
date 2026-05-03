import { Article } from "../articles/articlesManagment/types";

export interface ApiResponse {
    success: boolean;
    message?: string;
}

export interface ArticleApiResponse extends ApiResponse {
    data?: Article
} 