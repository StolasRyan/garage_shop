import { CharCount } from "./form.types";
import { ArticleFormField } from "../../articles/types";
import { FormField } from "../../categories/types";

export interface ImageSectionProps{
    type : 'article' | 'category'
    errors?: Record<string, string>;
    charCount: CharCount;
    onRemoveImage: () => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInputChange: (field: FormField | ArticleFormField, value: string, maxLength: number) => void;
}