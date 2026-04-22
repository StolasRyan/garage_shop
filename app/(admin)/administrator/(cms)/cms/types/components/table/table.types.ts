import { Category } from "../../models"


export interface CategoryTableProps{
    onEdit: (category: Category) => void
    onDelete: (id: string) => void
}

export type SortField = 'numericId' |  'name' | 'slug' | 'createdAt' | 'author';

export type SortDirection = 'asc' | 'desc';

export type FilterType = 'all' | 'name' | 'slug' | 'author' | 'description' | 'keywords';