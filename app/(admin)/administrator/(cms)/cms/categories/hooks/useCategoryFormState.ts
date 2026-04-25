"use client";
import { useCategoryStore } from "@/store/categoryStore";
import { transliterate } from "@/utils/transliterate";
import { useCallback, useState } from "react";
import { Category } from "../types";

export const useCategoryFormState = () => {
    const {formData, setFormData,updateFormField,resetFormData, setEditingId, clearEdidtingId, setShowForm, setOriginalImageUrl} = useCategoryStore();
  
  const [tempImageFile, setTempImageFile] = useState<File | null>(null);


  const generateSlug = useCallback(() => {
    if (!formData.name.trim()) {
      alert("Please enter a valid category name");
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

      const response = await fetch("/administrator/cms/api/categories/upload", {
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
  }, [formData.image, tempImageFile]);

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
    clearEdidtingId(); 
    setShowForm(false);
  }, [clearEdidtingId, formData.image, resetFormData, setOriginalImageUrl, setShowForm]);

  const deleteOldImage = useCallback(
    async (imageUrl: string): Promise<boolean> => {
      if (!imageUrl || imageUrl.startsWith("blob:")) return true;

      try {
        const fileName = imageUrl.split("/").pop();
        if (!fileName) return true;

        const response = await fetch(
          `/administrator/cms/api/categories/upload?file=${encodeURIComponent(fileName)}`,
          {
            method: "DELETE",
          },
        );

        const data = await response.json();
        return data.success === true;
      } catch (error) {
        console.error("Error while deleting image", error);
        return false;
      }
    },
    [],
  );

  const startCreate = useCallback(() => {
    resetForm();
    setShowForm(true);
  }, [resetForm, setShowForm]);

  const startEdit = useCallback((category: Category) => {
     setEditingId(category._id.toString());

     setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description,
        keywords: (category.keywords || []).join(", "),
        image: category.image || "",
        imageAlt: category.imageAlt || "",
     })

     setOriginalImageUrl(category.image || "");
     setTempImageFile(null);
     setShowForm(true);
  }, [setEditingId, setFormData, setOriginalImageUrl, setShowForm]);

  return {
    generateSlug,
    saveImageFile,
    removeImage,
    uploadImageToServer,
    getKeywordsArray,
    deleteOldImage,
    startCreate,
    startEdit,
    resetForm
  };
};
