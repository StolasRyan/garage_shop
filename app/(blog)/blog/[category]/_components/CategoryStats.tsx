import { CategoryStatsProps } from "../../types";

const CategoryStats = ({
  totalArticles,
  currentPage,
  totalPages,
  articlesCount,
}: CategoryStatsProps) => {
  return(
    <div className="mt-8 p-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-700 mb-4 md:mb-0">
            <span className="font-semibold">Articles found:</span>{' '}
            <span className="text-primary font-bold">{totalArticles}</span>
        </div>
        <div className="text-gray-600 text-sm">
            Showed {currentPage} of {totalPages} page. Total {articlesCount} of {totalArticles}
        </div>
    </div>
  )
};

export default CategoryStats;
