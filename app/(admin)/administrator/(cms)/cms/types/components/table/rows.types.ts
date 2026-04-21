import { Category } from "../../models";

export interface MobileCategoryHeaderProps {
  category: Category;
  displayNumericId: number | null;
}
export interface SortableItemProps {
  category: Category;
  displayNumericId: number | null;
  onDelete: (id: string) => void;
  onEdit: (category: Category) => void;
}

export interface MobileExpandableContentProps  {
  category: Category;
  onDelete: (id: string) => void;
  onEdit: (category: Category) => void;
}