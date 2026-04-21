import { useCategoryStore } from "@/store/categoryStore";
import { useSiteSettings } from "./useSiteSettings";

export const useStatsValues = () => {
    const {siteSettings} = useSiteSettings();
 const {totalAllItems} = useCategoryStore();
    const keywordsCount = siteSettings?.siteKeywords.length || 0;

    return{
        categoriesCount: totalAllItems,
        keywordsCount,
        publishedCount: 0,
        viewsCount: 0
    }
}