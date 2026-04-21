import TableHeader from "./TableHeader";
import EmptyState from "./EmptyState";
import SortableItem from "./SortableItem";
import { useCategoryStore } from "@/store/categoryStore";
import { Category, CategoryTableProps } from "../../types";

const CategoryTable = ({  onDelete , onEdit}:CategoryTableProps) => {
  const {categories, loading} = useCategoryStore();

 
  const getDisplayNumericId = (category: Category): number | null => {
    return category.numericId;
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-50">Loading categories...</div>
    );
  }
  return (
    <>
      <TableHeader />
      <div className="divide-y divide-gray-200">
        {categories.length === 0 ? (
          <EmptyState />
        ) : (
          categories.map((category) => {
            const caregoryId = category._id.toString();

            return (
              <SortableItem
                key={caregoryId}
                category={category}
                displayNumericId={getDisplayNumericId(category)}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default CategoryTable;
