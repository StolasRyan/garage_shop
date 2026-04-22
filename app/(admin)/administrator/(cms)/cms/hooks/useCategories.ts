import { useCategoryStore } from "@/store/categoryStore";
import {  useEffect } from "react";
import { ApiResponse, CategoryFormData, UpdateCategoryData } from "../types";

export const useCategories = () => {
  const {currentPage,loadCategoties} = useCategoryStore();


  useEffect(() => {
    loadCategoties({page:currentPage});
  }, [currentPage, loadCategoties]);

 
  const createCategory = async (
    categoryData: Omit<CategoryFormData, "keywords">,
  ): Promise<ApiResponse> => {
    try {
      const response = await fetch("/administrator/cms/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (response.ok) {
        await loadCategoties({page:1});
        return {
          success: true,
          message: data.message || "Category created successfully",
        };
      } else {
        console.error("Server error", data);
        return {
          success: false,
          message:
            data.message || `Error ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      console.error("Network error", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error while creating category",
      };
    }
  };

  const updateCategory = async (
    id: string,
    categoryData: UpdateCategoryData,
  ): Promise<ApiResponse> => {
    try {
      const response = await fetch(`/administrator/cms/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (response.ok) {
        await loadCategoties({page:currentPage});
        return {
          success: true,
          message: data.message || "Category updated successfully",
        };
      } else {
        console.error("Server error", data);
        return {
          success: false,
          message:
            data.message || `Error ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      console.error("Network error", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error while updating category",
      };
    }
  };

  const deleteCategory = async (id: string): Promise<ApiResponse> => {
    try {
      const response = await fetch(`/administrator/cms/api/categories/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        await loadCategoties({page:currentPage});
        return {
          success: true,
          message: data.message || "Category deleted successfully",
        };
      } else {
        return {
          success: false,
          message:
            data.message || `Error ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      console.error("Error deleting category", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error while deleting category",
      };
    }
  };

  return {
    createCategory,
    deleteCategory,
    updateCategory,
    loadCategoties
  };
};
