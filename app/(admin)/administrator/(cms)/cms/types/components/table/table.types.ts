import { Category } from "../../models"


export interface CategoryTableProps{
    onEdit: (category: Category) => void
    onDelete: (id: string) => void
}