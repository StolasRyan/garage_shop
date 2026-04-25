import { useCategoryStore } from "@/store/categoryStore";
import { useEffect } from "react";
import { useSiteSettings } from "./useSiteSettings";

export const useStatsValues = () => {
  const { siteSettings } = useSiteSettings();
  const { totalAllItems , loadCategories} = useCategoryStore();

  useEffect(() => {
    loadCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keywordsCount = siteSettings?.siteKeywords.length || 0;

  return {
    categoriesCount: totalAllItems,
    keywordsCount,
    publishedCount: 0,
    viewsCount: 0,
  };
};
