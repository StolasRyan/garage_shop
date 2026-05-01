import { baseUrl } from "@/utils/baseUrl";
import { ApiError, CategoryPageResponse } from "../../types";

export async function fetchCategoryPageData(
  categorySlug: string,
  page: number = 1,
  itemsPerPage: number = 3,
): Promise<CategoryPageResponse | ApiError> {
  try {
    const response = await fetch(
      `${baseUrl}/api/blog/${encodeURIComponent(categorySlug)}?page=${page}&itemsPerPage=${itemsPerPage}`,{
        next:{
            revalidate: 3600
        }
      }
    );

    if(!response.ok){
        if(response.status === 400){
            return {error: 'Category not found'}
        }
        return {error: 'Server error'}
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch artcles category: ${error}`);
    return {error: 'Server error'}
  }
}
