"use client";
import { useArticleStore } from './../../../../../../../store/articleStore';
import { transliterate } from "@/utils/transliterate";
import { useCallback, useState } from "react";

export const useArticleFormState = () => {
    const {formData,updateFormField,resetFormData, setOriginalImageUrl} = useArticleStore();
  
  const [tempImageFile, setTempImageFile] = useState<File | null>(null);


  const generateSlug = useCallback(() => {
    if (!formData.name.trim()) {
      alert("Please enter a valid article name");
      return;
    }
    const slug = transliterate(formData.name, true);
    updateFormField("slug", slug);
  }, [formData.name, updateFormField]);

  const saveImageFile = useCallback(
    (file: File) => {
      setTempImageFile(file);
      const tempUrl = URL.createObjectURL(file);
      updateFormField("image", tempUrl);

      if (formData.name) {
        updateFormField("imageAlt", `${formData.name}`);
      }
    },
    [formData.name, updateFormField],
  );

  const removeImage = useCallback(() => {
    if (formData.image && formData.image.startsWith("blob:")) {
      URL.revokeObjectURL(formData.image);
    }

    setTempImageFile(null);
    updateFormField("image", "");
    updateFormField("imageAlt", "");
  }, [formData.image, updateFormField]);

  const uploadImageToServer = useCallback(async (): Promise<{
    url: string;
    fileName: string;
  } | null> => {
    if (!tempImageFile) {
      return null;
    }
    console.log(tempImageFile);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image", tempImageFile);

        if(formData.categorySlug){
            uploadFormData.append("categorySlug", formData.categorySlug)
        }

      const response = await fetch("/administrator/cms/api/articles/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (formData.image && formData.image.startsWith("blob:")) {
          URL.revokeObjectURL(formData.image);
        }
        setTempImageFile(null);

        return { url: data.url, fileName: data.fileName };
      } else {
        throw new Error(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error while uploading image", error);
      throw error;
    }
  }, [formData.categorySlug, formData.image, tempImageFile]);

  const getKeywordsArray = useCallback(() => {
    if (!formData.keywords) {
      return [];
    }
    return formData.keywords
      .split(",")
      .map((keyword: string) => keyword.trim())
      .filter((keyword: string) => keyword.length > 0);
  }, [formData.keywords]);

  const resetForm = useCallback(() => {
    if (formData.image && formData.image.startsWith("blob:")) {
      URL.revokeObjectURL(formData.image);
    }
    resetFormData();
    setTempImageFile(null);
    setOriginalImageUrl("");
  }, [formData.image, resetFormData, setOriginalImageUrl]);

  return {
    generateSlug,
    saveImageFile,
    removeImage,
    uploadImageToServer,
    getKeywordsArray,
    resetForm
  };
};
