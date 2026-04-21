"use client";
import { useAuthStore } from "@/store/authStore";
import Header from "../_components/Header";
import SEOReccomendations from "../_components/SEOReccomendations";
import { useCategoryFormState } from "../hooks/useCategoryFormState";
import { useCategoryFormValidation } from "../hooks/useCategoryFormValidation";
import { categorySEOReccomendations } from "../utils/reccomendations";
import CategoryForm from "./_components/CategoryForm";
import CategoryTable from "./_components/CategoryTable";
import { useEffect, useState } from "react";
import { useCategories } from "../hooks/useCategories";
import Notification from "./_components/Notification";
import WarningAlert from "./_components/WarningAlert";
import HeaderActions from "./_components/HeaderActions";
import { useCategoryStore } from "@/store/categoryStore";
import Pagination from "../_components/Pagination";
import ItemsPerPageSelector from "./_components/ItemsPerPageSelector";

const CategoriesPage = () => {
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const { user } = useAuthStore();
  const author = `${user?.surname} ${user?.name}`.trim() || "Unknown";
  const {
    categories,
    totalAllItems,
    editingId,
    totalPages,
    showForm,
    originalImageUrl,
    formData,
    currentPage,
    itemsPerPage,
    setIsSubmitting,
    setItemsPerPage,
    setCurrentPage
  } = useCategoryStore();

  const { createCategory, deleteCategory, updateCategory, loadCategoties } = useCategories();

  const {
    generateSlug,
    saveImageFile,
    removeImage,
    uploadImageToServer,
    getKeywordsArray,
    deleteOldImage,
    startCreate,
    startEdit,
    resetForm,
  } = useCategoryFormState();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    loadCategoties({page: currentPage});
  }, [currentPage, loadCategoties]);

  const { errors, validateForm } = useCategoryFormValidation();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm(formData)) {
      setNotification({
        type: "error",
        message: "Please fill in all required fields",
      });
      setIsSubmitting(false);
      return;
    }

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
      const categoryData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        keywords: getKeywordsArray(),
        image: finalImageUrl,
        imageAlt: formData.imageAlt,
        numericId: null,
        author,
      };

      const createResult = await createCategory(categoryData);

      if (createResult.success) {
        setNotification({
          type: "success",
          message: "Category created successfully",
        });
        resetForm();
      } else {
        setNotification({
          type: "error",
          message: createResult.message || "Failed to create category",
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setIsSubmitting(true);

    if (!validateForm(formData)) {
      console.error("Validation error");
      setNotification({
        type: "error",
        message: "Please fill in all required fields",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      let finalImageUrl = formData.image;
      let shouldDeleteOldImage = false;

      if (formData.image && formData.image.startsWith("blob:")) {
        try {
          const uploadResult = await uploadImageToServer();
          if (uploadResult) {
            finalImageUrl = uploadResult.url;
            shouldDeleteOldImage = true;
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
      } else if (!formData.image && originalImageUrl) {
        shouldDeleteOldImage = true;
      }

      if (shouldDeleteOldImage && originalImageUrl) {
        const deleteSuccess = await deleteOldImage(originalImageUrl);
        if (deleteSuccess) {
          console.warn("Old image deleted successfully");
        } else {
          console.warn("Failed to delete old image");
        }
      }

      const updateData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        image: finalImageUrl,
        imageAlt: formData.imageAlt,
        keywords: getKeywordsArray(),
      };

      const result = await updateCategory(updateData);

      if (result.success) {
        setNotification({
          type: "success",
          message: "Category updated successfully",
        });
        resetForm();
      } else {
        console.error("Failed to update category", result.message);
        setNotification({
          type: "error",
          message: result.message || "Failed to update category",
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const categoryToDelete = categories.find(
      (category) => category._id.toString() === id,
    );

    const result = await deleteCategory(id);

    if (result.success) {
      if (categoryToDelete?.image) {
        try {
          await deleteOldImage(categoryToDelete.image);
        } catch (error) {
          console.error("Error deleting old image", error);
        }
      }

      setNotification({
        type: "success",
        message: "Category deleted successfully",
      });
    } else {
      setNotification({
        type: "error",
        message: result.message || "Failed to delete category",
      });
    }
  };

  const handleItemsPerPageChange = (perPage: number) => {
      setItemsPerPage(perPage);
      setCurrentPage(1);
      loadCategoties({page:1})
  }

  return (
    <div className="relative">
      <Header
        title="Categories"
        description={`Total categories: ${totalAllItems}`}
      />
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <HeaderActions onCreate={startCreate} />
      <div className="mb-4">
        <ItemsPerPageSelector value={itemsPerPage} onChange={handleItemsPerPageChange}/>
      </div>
      <WarningAlert />
      {showForm && (
        <CategoryForm
          errors={errors}
          onGenerateSlug={generateSlug}
          onSaveImageFile={saveImageFile}
          onRemoveImage={removeImage}
          onSubmit={editingId ? handleUpdate : handleCreate}
          onCancel={resetForm}
        />
      )}
      <CategoryTable onDelete={handleDelete} onEdit={startEdit} />
      {totalPages > 1 && <Pagination />}
      <SEOReccomendations reccomendations={categorySEOReccomendations} />
    </div>
  );
};

export default CategoriesPage;
