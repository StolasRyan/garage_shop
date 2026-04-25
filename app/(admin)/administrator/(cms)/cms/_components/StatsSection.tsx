import { stats } from "../utils/stats";
import StatsItem from "./StatsItem";
import StatsSkeleton from "./StatsSkeleton";
import { getStatValue } from "../utils/getStatValue";
import { useCategoryStore } from "@/store/categoryStore";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { useStatsValues } from "../hooks/useStatsValues";

const StatsSection = () => {
  const { categoriesCount, keywordsCount } = useStatsValues();
  const { loading: settingsLoading } = useSiteSettings();
  const {loading: categoriesLoading} = useCategoryStore();
  const loading = settingsLoading || categoriesLoading;

  if (loading) return <StatsSkeleton />;
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        General statistics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsItem
            key={index}
            stat={stat}
            statValue={getStatValue(
              stat.title,
              categoriesCount.toString(),
              keywordsCount.toString(),
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
