import { useCategoryStore } from "@/store/categoryStore";
import {  useEffect } from "react";
import { ApiResponse, CategoryFormData, UpdateCategoryData } from "../types";

export const  useCategories = () => {
  const {currentPage,loadCategories} = useCategoryStore();


  useEffect(() => {
    loadCategories({page:currentPage});
  }, [currentPage, loadCategories]);

 
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
        await loadCategories({page:1});
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
        await loadCategories({page:currentPage});
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
        await loadCategories({page:currentPage});
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

  const reorderCategories = async (
    categories: Array<{ _id: string; numericId: number }>
  ):Promise<ApiResponse>=>{
    try {
        const response = await fetch("/administrator/cms/api/categories/reorder", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(categories),
        })

        const data = await response.json();

        if(response.ok){
            await loadCategories();
            return {
                success:true,
                message:data.message || "Categories reordered successfully"
            }
        }else{
            return {
                success:false,
                message:data.message || `Error ${response.status}: ${response.statusText}`
            }
        }
    } catch (error) {
        console.error("Error reordering categories", error);
        return {
            success:false,
            message:error instanceof Error ? error.message : "Error while reordering categories"
        }
    }
  }

  return {
    createCategory,
    deleteCategory,
    updateCategory,
    loadCategories,
    reorderCategories
  };
};
