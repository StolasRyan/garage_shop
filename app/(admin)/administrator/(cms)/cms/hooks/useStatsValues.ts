import { useCategoryStore } from "@/store/categoryStore";
import { useSiteSettings } from "./useSiteSettings";
import { useEffect } from "react";

export const useStatsValues = () => {
  const { siteSettings } = useSiteSettings();
  const { totalAllItems , loadCategoties} = useCategoryStore();

  useEffect(() => {
    loadCategoties();
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
