import { CharCount } from "../../../types/form/form.types"
import { ArticleFormData } from "./article-form.types"


export interface ArticleFormFieldsProps{
    charCount: CharCount
    onInputChange: (field: FormField, value: string, maxLength: number) => void
    onGenerateSlug: () => void
}
export type FormField = keyof ArticleFormData