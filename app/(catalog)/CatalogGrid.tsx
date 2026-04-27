import { CatalogGridProps } from "@/types/catalogGridProps";
import GridCategoryBlock from "./GridCategoryBlock";

const CatalogGrid = ({
  categories,
  isEditing,
  hoveredCategoryId,
  draggedCategory,
  handleDragStart,
  handleDragOver,
  handleDragLeave,
  handleDrop,
}:CatalogGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {categories.map((category, index) => (
        <div
          key={category._id}
          className={`${category.mobileColSpan} ${category.tabletColSpan} ${category.colSpan} bg-gray-100 rounded overflow-hidden min-h-50 h-full
            ${isEditing ? "border-3 border-dashed border-gray-500" : ""}
            ${hoveredCategoryId === category._id ? "border-3 border-dashed border-red-500" : ""}
            `}
          onDragOver={(e) => handleDragOver(e, category._id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, category._id)}
        >
          <div
            className={`h-full w-full ${draggedCategory?._id === category._id ? "opacity-50" : ""}`}
            draggable={isEditing}
            onDragStart={() => handleDragStart(category)}
          >
            <GridCategoryBlock
              slug={category.slug}
              img={category.img}
              title={category.title}
              priority={index < 4}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatalogGrid;
