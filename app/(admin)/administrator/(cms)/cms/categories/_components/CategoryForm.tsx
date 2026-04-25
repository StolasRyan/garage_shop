"use client";
import ImageSection from "../../_components/ImageSection";
import FormFields from "./FormFields";
import SubmitSection from "./SubmitSection";
import { useCategoryStore } from "@/store/categoryStore";
import { CategoryFormField, CategoryFormProps} from "../types";
import { CharCount } from "../../types/form/form.types";

const CategoryForm = ({
  errors,
  onSubmit,
  onCancel,
  onGenerateSlug,
  onSaveImageFile,
  onRemoveImage,
}:Omit<CategoryFormProps , "onFieldChange">) => {
  const {formData,setIsUploading, updateFormField} = useCategoryStore();

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
    maxLength: number,
  ) => {
    if (value.length <= maxLength) {
      updateFormField(field as CategoryFormField, value);
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
  return (
    <div className="mb-8 bg-white rounded shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Add new category</h2>
      <form onSubmit={onSubmit}>
        <ImageSection
          type="category"
          errors={errors}
          charCount={charCount}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onRemoveImage={onRemoveImage}
        />
        <FormFields
          errors={errors}
          charCount={charCount}
          onInputChange={handleInputChange}
          onGenerateSlug={handleGenerateSlug}
        />
        <SubmitSection
          onCancel={onCancel}
        />
      </form>
    </div>
  );
};

export default CategoryForm;
