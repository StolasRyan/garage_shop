import { ArticleCradProps } from "@/types/articlesListProps";
import Image from "next/image";
import Link from "next/link";
import { getColorFromName } from "../../utils/getColorFromName";

const ArticleCard = ({
  slug,
  categorySlug,
  categoryName,
  image,
  imageAlt,
  name,
  description,
  publishedAt,
}: ArticleCradProps) => {
  const articleUrl = `/blog/${categorySlug}/${slug}`;
  
  const grdientClass = getColorFromName(categoryName);
  return (
    <Link href={articleUrl} className="block h-full">
      <article className="bg-white h-full flex flex-col rounded overflow-hidden shadow-(--shadow-card) hover:shadow-(--shadow-article) duration-300">
        <div className="relative h-48 w-full">
          {image ? (
            <Image
              src={image}
              alt={imageAlt || name}
              fill
              className="object-cover"
              quality={100}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={false}
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center bg-linear-to-br ${grdientClass} rounded-top`}
            >
              <div className="text-white text-center p-4">
              <div className="text-white text-xl font-semibold leading-tight px-4">
                {name}
              </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
              {categoryName}
            </span>
            <time className="text-[8px] text-[#8f8f8f]">
            {new Date(publishedAt).toLocaleDateString("ru-RU")}
          </time>
          </div>
          
          <h3 className="text-lg text-gray-600 font-bold mb-2 line-clamp-2">
            {name}
          </h3>
          <p className="text-gray-600 line-clamp-3 text-sm mb-4 flex-1">
            {description}
          </p>

            <div className="mt-auto">
              <div className="w-full py-2 text-center bg-lime-50 text-lime-600 rounded hover:bg-lime-300 hover:text-white duration-300">
                Details
              </div>
            </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
