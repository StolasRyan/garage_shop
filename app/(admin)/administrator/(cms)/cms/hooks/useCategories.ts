import { useCategoryStore } from "@/store/categoryStore";
import { useCallback, useEffect } from "react";
import { ApiResponse, CategoryFormData, UpdateCategoryData } from "../types";

export const useCategories = () => {
  const {
    setCategories,
    setTotalAllItems,
    editingId,
    setLoading,
    setTotalPages,
    setTotalItems,
    setCurrentPage,
    itemsPerPage,
    currentPage,
  } = useCategoryStore();


  const id = editingId;


  const loadCategoties = useCallback(async (params?:{page?:number}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams()
      const pageToLoad = params?.page !== undefined ? params.page : currentPage;
      queryParams.append('pageToLoad', pageToLoad.toString());
      queryParams.append('limit', itemsPerPage.toString());
      const response = await fetch(`/administrator/cms/api/categories?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        setCategories(data.data.categories);
        setTotalAllItems(data.data.totalInDb);
        setTotalItems(data.data.pagination.total);
        setTotalPages(data.data.pagination.totalPages); 

        if(params?.page !== undefined && params?.page !== currentPage ){
          setCurrentPage(params.page);
        }
      }
    } catch (error) {
      console.error("Error loading categories", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, setCategories, setCurrentPage, setLoading, setTotalAllItems, setTotalItems, setTotalPages]);

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
        await loadCategoties();
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
        await loadCategoties();
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
        await loadCategoties();
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

  useEffect(() => {
    loadCategoties();
  }, [loadCategoties]);

  return {
    createCategory,
    deleteCategory,
    updateCategory,
    loadCategoties
  };
};
