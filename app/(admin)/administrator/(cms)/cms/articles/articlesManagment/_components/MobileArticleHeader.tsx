import { MobileArticleHeaderProps } from "../types";

const MobileCategoryHeader = ({
  article,
  displayNumericId,
}: MobileArticleHeaderProps) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="inline-flex items-center justify-center w-5 h-5 bg-gray-100 rounded-full text-[10px] font-medium shrink-0"
          title="Order number"
        >
          {displayNumericId || "—"}
        </span>
        <h3
          className="font-medium text-gray-900 text-sm break-all"
          title={article.name}
        >
          {article.name}
        </h3>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-2">
        <div
          className="text-xs bg-gray-100 px-2 py-1 rounded font-mono break-all"
          title="Category"
        >
          {article.categoryName}
        </div>
      </div>
    </div>
  );
};

export default MobileCategoryHeader;
