"use client";

import { useAuthStore } from "@/store/authStore";
import SEOReccomendations from "../../_components/SEOReccomendations";
import { useEffect, useState } from "react";
import Header from "../../_components/Header";
import Notification from "../../_components/Notification";
import { articleSEOReccomendations } from "../../utils/reccomendations";
import { useArticleStore } from "@/store/articleStore";
import { useArticles } from "../hooks/useArticles";
import { useArticleFormState } from "../hooks/useArticleFormState";
import { useCategoryStore } from "@/store/categoryStore";
import ArticleForm from "./_components/ArticleForm";

const EditorPage = () => {
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const { user } = useAuthStore();
  const author = `${user?.surname} ${user?.name}`.trim() || "Unknown";
  const { formData, updateFormField, setIsSubmitting } = useArticleStore();
  const { createArticle } = useArticles();

  const {
    generateSlug,
    saveImageFile,
    removeImage,
    uploadImageToServer,
    getKeywordsArray,
    resetForm,
  } = useArticleFormState();

  const {loadCategories} = useCategoryStore()

  useEffect(()=>{
    const fetchCategories = async () => {
        try {
            await loadCategories();
        } catch (error) {
            console.error('Failed to load categories', error);
        }
    }
    fetchCategories();
  },[loadCategories])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let finalImageUrl = "";
      if (formData.image && formData.image.startsWith("blob:")) {
        try {
          const uploadResult = await uploadImageToServer();
          if (uploadResult) {
            finalImageUrl = uploadResult.url;
            console.log(finalImageUrl);
          } else {
            throw new Error("Failed to upload image");
          }
        } catch (uploadError) {
          console.error("Error while uploading image", uploadError);
          setNotification({
            type: "error",
            message: "Failed to upload image",
          });
          setIsSubmitting(false);
          return;
        }
      }
      const articleData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        keywords: getKeywordsArray(),
        image: finalImageUrl,
        imageAlt: formData.imageAlt,
        numericId: null,
        author,
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        categorySlug: formData.categorySlug,
        content: formData.content || "",
        status: formData.status || "draft",
        isFeatured: formData.isFeatured || false,
        views: 0,
      };

      const createResult = await createArticle(articleData);

      if (createResult.success) {
        setNotification({
          type: "success",
          message: "Article created successfully",
        });
        resetForm();
      } else {
        setNotification({
          type: "error",
          message: createResult.message || "Failed to create article",
        });
      }
    } catch (error) {
      console.error("Unexpected error", error);
      setNotification({
        type: "error",
        message: "Unexpected error happened",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <Header title="Articles" description="Create and manage your articles" />
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
        <ArticleForm
         onFieldChange={updateFormField}
        onGenerateSlug={generateSlug}
        onSaveImageFile={saveImageFile}
        onRemoveImage={removeImage}
        onSubmit={handleCreate}
        onCancel={resetForm}
        />
      <SEOReccomendations reccomendations={articleSEOReccomendations} />
    </div>
  );
};

export default EditorPage;
