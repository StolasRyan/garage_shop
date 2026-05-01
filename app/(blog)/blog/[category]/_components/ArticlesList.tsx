import { ArticlesListProps } from "../../types";
import ArticleCard from "@/app/(articles)/ArticleCard";

const ArticlesList = ({
  articles,
  categoryName,
  categorySlug,
}: ArticlesListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {articles.map((article, index)=>{
            const delayClass = `animate-delay-${Math.min(index, 8)}`

            return(
                <div 
                key={article._id}
                className={`animate-gentle-appear ${delayClass}`}>
                    
                    <ArticleCard
                    slug={article.slug}
                    categorySlug={categorySlug}
                    name={article.name}
                    image={article.image}
                    imageAlt={article.imageAlt}
                    categoryName={categoryName}
                    description={article.description}
                    publishedAt={article.publishedAt}
                />
                </div>
            )
        })}
    </div>
  )
};

export default ArticlesList;
