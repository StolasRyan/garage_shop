"use client";
import { ArticleFormField, ArticleFormProps } from "../../types";
import { CharCount } from "../../../types/form/form.types";
import ImageSection from "../../../_components/ImageSection";
import ArticleFormFields from "./ArticleFormFields";
import { useArticleStore } from "@/store/articleStore";
import { useCategoryStore } from "@/store/categoryStore";
import CategorySelect from "./CategorySelect";
import ArticleSubmitSection from "./ArticleSubmitSection";
import TiptapEditor from "./tiptap-components/TiptapEditor";

const ArticleForm = ({ 
    onFieldChange, 
  onSubmit,
  onCancel,
  onGenerateSlug,
  onSaveImageFile,
  onRemoveImage,
}:ArticleFormProps) => {
  const {formData,setIsUploading} = useArticleStore();
  const {categories} = useCategoryStore();

  const charCount: CharCount = {
    name: formData.name.length,
    slug: formData.slug.length,
    description: formData.description.length,
    keywords: formData.keywords.length,
    imageAlt: formData.imageAlt.length,
  };

  const handleInputChange = (
    field: string,
    value: string,
    maxLength?: number,
  ) => {
    if(field === 'content'){
      onFieldChange(field as ArticleFormField, value);
    }
    if (value.length <= maxLength!) {
      onFieldChange(field as ArticleFormField, value);
    }
  };

  const handleGenerateSlug = () => {
    onGenerateSlug();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }
    setIsUploading(true);

    try {
      onSaveImageFile(file);
    } catch (error) {
      console.error("Error choosing image", error);
      alert("Failed to choose image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCategoryChange = (categoryId: string, categoryName: string, categorySlug: string) => {
    onFieldChange("categoryId", categoryId);
    onFieldChange("categoryName", categoryName);
    onFieldChange("categorySlug", categorySlug);
  }

  return (
    <div className="mb-8 bg-white rounded shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Add new article</h2>
       <ImageSection
          type="article"
          charCount={charCount}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onRemoveImage={onRemoveImage}
        />
         
      <form onSubmit={onSubmit}>
        {categories.length > 0 && (
          <div className="mb-6 bg-gray-50 p-4 rounded border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Articles Category *</h3>
            <CategorySelect
              value={formData.categoryId || ""}
              onChange={handleCategoryChange}
            />
          </div>
        )}
        <ArticleFormFields
          charCount={charCount}
          onInputChange={handleInputChange}
          onGenerateSlug={handleGenerateSlug}
        />
        <div className="my-6 bg-gray-50 p-4 rounded border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Articles text</h3>
            <TiptapEditor
            key={`editor-${formData.slug}`}
            content={formData.content || ''}
            onContentChange={(content) => handleInputChange ('content', content)}
            />
        </div>
        <ArticleSubmitSection onCancel={onCancel}/>
      </form>
    </div>
  );
};

export default ArticleForm;
