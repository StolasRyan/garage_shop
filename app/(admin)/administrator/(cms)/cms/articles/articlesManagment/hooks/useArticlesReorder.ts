import { useArticlesManagmentStore } from "@/store/articlesManagmentStore";
import { ApiResponse } from "../../../types/entities.types";

export const useArticlesReorder = () => {
  const { loadArticles } = useArticlesManagmentStore();
  const reorderArticles = async (
    articles: Array<{ _id: string; numericId: number }>,
  ): Promise<ApiResponse> => {
    try {
      const response = await fetch(
        "/administrator/cms/api/articles/articles-managment/reorder",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(articles),
        },
      );

      const data = await response.json();

      if (response.ok) {
        await loadArticles();
        return {
          success: true,
          message: data.message || "Categories reordered successfully",
        };
      } else {
        return {
          success: false,
          message:
            data.message || `Error ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      console.error("Error reordering categories", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error while reordering categories",
      };
    }
  };

  return {
    loadArticles,
    reorderArticles,
  };
};
