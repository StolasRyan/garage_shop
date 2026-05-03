import { useCategoryStore } from "@/store/categoryStore";
import { useEffect, useState } from "react";
import { useSiteSettings } from "./useSiteSettings";

export const useStatsValues = () => {
  const { siteSettings } = useSiteSettings();
  const { totalAllItems , loadCategories} = useCategoryStore();
  const [publishedCount, setPublishedCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const loadAllData = async () => {
      try {
        await loadCategories();
      const response = await fetch("/administrator/cms/api/stats");
      if(!response.ok){
        throw new Error("Failed to upload stats");
      }
      const data = await response.json();
      setPublishedCount(data.publishedCount || 0);
      setViewsCount(data.totalViews || 0);
    } catch (error) {
      console.error("Error loading stats", error);
    } finally {
      setLoading(false);
    }
   }
    loadAllData();
  }, [loadCategories]);

  const keywordsCount = siteSettings?.siteKeywords.length || 0;

  return {
    categoriesCount: totalAllItems,
    keywordsCount,
    publishedCount,
    viewsCount,
    loading,
  };
};
