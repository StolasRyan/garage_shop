"use client";

import { CatalogProps } from "@/types/catalog";
import React, { useEffect, useState } from "react";
import ErrorComponent from "@/app/components/ErrorComponent";
import { Loader } from "@/app/components/Loader";
import CatalogAdminControls from "../CatalogAdminControls";
import CatalogGrid from "../CatalogGrid";
import { useAuthStore } from "@/store/authStore";

const CatalogPage = () => {
  const {user} = useAuthStore()
  const [categories, setCategories] = useState<CatalogProps[]>([]);
  const [error, setError] = useState<{error: Error; userMessage: string} | null>(null);
  const [draggedCategory, setDraggedCategory] = useState<CatalogProps | null>(
    null,
  );
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const isAdmin = user?.role === 'admin'
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/catalog");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data: CatalogProps[] = await response.json();

      setCategories(data.sort((a, b) => a.order - b.order));
    } catch (e) {
      setError({
        error: e instanceof Error ? e : new Error(String(e)),
        userMessage: "Failed to fetch categories",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateOrderInDB = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/catalog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          categories.map((category, index) => ({
            _id: category._id,
            order: index + 1,
            title: category.title,
            img: category.img,
            colSpan: category.colSpan,
            tabletColSpan: category.tabletColSpan,
            mobileColSpan: category.mobileColSpan,
          })),
        ),
      });
      if (!response.ok) {
        throw new Error("Failed to update order");
      }
      await response.json();
    } catch (e) {
      setError({
        error: e instanceof Error ? e : new Error(String(e)),
        userMessage: "Failed to update categories order",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleeToogleEditing = async () => {
    if (isEditing) {
      await updateOrderInDB();
    }
    setIsEditing(!isEditing);
  };

  const handleDragStart = (category: CatalogProps) => {
    if (isEditing) {
      console.log(category);

      setDraggedCategory(category);
    }
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    categoryId: string,
  ) => {
    e.preventDefault();
    if (draggedCategory && draggedCategory._id !== categoryId) {
      console.log(categoryId);

      setHoveredCategoryId(categoryId);
    }
  };

  const handleDragLeave = () => {
    setHoveredCategoryId(null);
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    targetCategoryId: string,
  ) => {
    e.preventDefault();
    if (!isEditing || !draggedCategory) return;
    setCategories((prevCategories) => {
      const draggedIndex = prevCategories.findIndex(
        (c) => c._id === draggedCategory._id,
      );
      const targetIndex = prevCategories.findIndex(
        (c) => c._id === targetCategoryId,
      );

      if (draggedIndex === -1 || targetIndex === -1) return prevCategories;
      const newCategories = [...prevCategories];
      const draggedItem = newCategories[draggedIndex];
      const targetItem = newCategories[targetIndex];

      const draggedSizes = {
        mobileColSpan: draggedItem.mobileColSpan,
        tabletColSpan: draggedItem.tabletColSpan,
        colSpan: draggedItem.colSpan,
      };

      const targetSizes = {
        mobileColSpan: targetItem.mobileColSpan,
        tabletColSpan: targetItem.tabletColSpan,
        colSpan: targetItem.colSpan,
      };

      newCategories[draggedIndex] = { ...targetItem, ...draggedSizes };
      newCategories[targetIndex] = { ...draggedItem, ...targetSizes };
      return newCategories;
    });
    setDraggedCategory(null);
    setHoveredCategoryId(null);
  };

  const resetLayout = async () => {
    setIsEditing(false);
    fetchCategories();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent error={error.error} userMessage={error.userMessage}/>
  }

  if (!categories.length) {
    return (
      <div className="text-center py-8 text-gray-500">No categories found</div>
    );
  }

  return (
    <section className="px-[max(12px, calc((100%-1208px)/2))] mx-auto mt-20">
      {isAdmin && (
        <CatalogAdminControls isEditing={isEditing} handleeToogleEditing={handleeToogleEditing} resetLayout={resetLayout}/>
      )}
      <h1 className="mb-4 md:mb-8 lg:mb-10 flex flex-row text-4xl md:text-5xl lg:text-[64px] text-[#414141] font-bold">
        Catalog
      </h1>
      <CatalogGrid 
        categories={categories}
        isEditing={isEditing}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleDrop={handleDrop}
        hoveredCategoryId={hoveredCategoryId}
        draggedCategory={draggedCategory}
      />
    </section>
  );
};

export default CatalogPage;
