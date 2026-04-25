import { CharCount } from "../../../../types/form/form.types"
import { CategoryFormData } from "./category-form.types"

export interface FormFieldsProps{
    errors: Record<string, string>
    charCount: CharCount
    onInputChange: (field: FormField, value: string, maxLength: number) => void
    onGenerateSlug: () => void
}  

export type FormField = keyof CategoryFormData;