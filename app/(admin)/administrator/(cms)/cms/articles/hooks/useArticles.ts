import { ArticleApiResponse } from "../../types/entities.types";
import { ArticleFormData } from "../types";

export const  useArticles = () => {
 
 
  const createArticle = async (
    articleData: Omit<ArticleFormData, "keywords">,
  ): Promise<ArticleApiResponse> => {
    try {
      const response = await fetch("/administrator/cms/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      const responseData = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: responseData.message || "Article created successfully",
          data: responseData.data,
        };
      } else {
        console.error("Server error", responseData);
        return {
          success: false,
          message:
            responseData.message || `Error ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      console.error("Network error", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error while creating article",
      };
    }
  };


  return {
    createArticle,
  };
};
