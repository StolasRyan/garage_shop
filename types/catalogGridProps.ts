import { CatalogProps } from "./catalog";

export interface CatalogGridProps{
    categories: CatalogProps[],
  isEditing: boolean,
  hoveredCategoryId: string | null,
  draggedCategory: CatalogProps | null,
  handleDragStart: (category: CatalogProps) => void,
  handleDragOver:  (e: React.DragEvent<HTMLDivElement>, categoryId: string) => void,
  handleDragLeave: ()=>void,
  handleDrop: (e: React.DragEvent<HTMLDivElement>, targetCategoryId: string) => void,
}