import { BlogCategoryCardProps } from "../types/categories.types"
import { getColorFromName } from "../../../../../utils/getColorFromName";
import CategoryContent from "./CategoryContent";
import CategoryHoverEffect from "./CategoryHoverEffect";
import CategoryImage from "./CategoryImage";
import CategoryNewBadge from "./CategoryNewBadge";


const CategoryCard = ({category, priority= false}:BlogCategoryCardProps) => {

    const hasImage = category.image && category.image.trim() !== '';
    const gradientClass = getColorFromName(category.name);
    const description = category.description || 'Search for articles by this theme';

  return (
    <article className="group bg-white h-full flex flex-col rounded overflow-hidden shadow-md hover:shadow-lg duration-300 hover:-translate-y-0.5">
        <CategoryNewBadge createdAt={category.createdAt}/>
        <CategoryImage
        hasImage={hasImage}
        image={category.image}
        imageAlt={category.imageAlt || category.name}
        gradientClass={gradientClass}
        name={category.name}
        priority={priority}
        />
        <CategoryContent
        createdAt={category.createdAt}
        author={category.author}
        name={category.name}
        description={description}
        slug={category.slug}
        />
        <CategoryHoverEffect/>
    </article>
  )
}

export default CategoryCard