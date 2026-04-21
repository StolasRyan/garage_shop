import { useState } from "react";
import { SEO_LIMITS } from "../utils/SEO_LIMITS";
import { CategoryFormData } from "../types";

export const useCategoryFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: CategoryFormData): boolean => {
    const newErrors: Record<string, string> = {};

    if (
      formData.name.length < SEO_LIMITS.name.min ||
      formData.name.length > SEO_LIMITS.name.max
    ) {
      newErrors.name = SEO_LIMITS.name.message;
    }

    if (
      formData.slug.length < SEO_LIMITS.slug.min ||
      formData.slug.length > SEO_LIMITS.slug.max
    ) {
      newErrors.slug = SEO_LIMITS.slug.message;
    }

    if (
      formData.description.length < SEO_LIMITS.description.min ||
      formData.description.length > SEO_LIMITS.description.max
    ) {
      newErrors.description = SEO_LIMITS.description.message;
    }

    if (
      formData.imageAlt.length < SEO_LIMITS.imageAlt.min ||
      formData.imageAlt.length > SEO_LIMITS.imageAlt.max
    ) {
      newErrors.imageAlt = SEO_LIMITS.imageAlt.message;
    }

    
    if (formData.keywords) {
      const keywordsArray = formData.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0);

        if(keywordsArray.length > SEO_LIMITS.keywords.maxCount){
            newErrors.keywords = `Maximum ${SEO_LIMITS.keywords.maxCount} keywords allowed`;
        }
        if(formData.keywords.length > SEO_LIMITS.keywords.maxLength){
            newErrors.keywords = SEO_LIMITS.keywords.message;
        }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearError = (field: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    errors,
    validateForm,
    clearErrors,
    clearError,
  };
};
