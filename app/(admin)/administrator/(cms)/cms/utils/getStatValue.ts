export const getStatValue = (
  statTitle: string,
  categoriesCount: string,
  keywordsCount: string,
  publishedCount: string,
  viewsCount: string
) => {
  switch (statTitle) {
    case "Categories":
      return categoriesCount;
    case "Key words":
      return keywordsCount;
    case "Published":
      return publishedCount;
    case "Views":
      return viewsCount;
    default:
      return "0";
  }
};
