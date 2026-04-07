'use client';
import { useCallback, useEffect, useRef, useState } from "react";
import { Category } from "@/types/categories";
import CatalogMenu from "./CatalogMenu";

const CatalogMenuWrapper = () => {
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [error, setError] = useState<{error: Error; userMessage: string} | null>(null);
  const searchBlockRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchCategories = async () => {
    if (categories.length > 0) return;
    try {
      setIsLoading(true);
      const response = await fetch("/api/catalog");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      console.log(data);

      setCategories(data);
    } catch (e) {
      setError({
        error: e instanceof Error ? e : new Error(String(e)),
        userMessage: "Failed to fetch catalog",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const openMenu = () => {
    if(!isSearchFocused){
      setIsCatalogOpen(true);
    fetchCategories();

    }
    
  };

  const handleMouseMove = useCallback((e: MouseEvent) =>{
    if(!searchBlockRef.current || !isCatalogOpen || isSearchFocused) return;
    const isInsideMenu = menuRef.current?.contains(e.target as Node);
    if(isInsideMenu) return;

    const searchBlockRect = searchBlockRef.current.getBoundingClientRect();

    if(e.clientX < searchBlockRect.left || e.clientX > searchBlockRect.right){
      setIsCatalogOpen(false);
    }
  },[isCatalogOpen, isSearchFocused])

  useEffect(()=>{
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    }
  },[handleMouseMove])

  const handleSearchFocusAction = (focused: boolean) => {
    setIsSearchFocused(focused);
    if(focused) setIsCatalogOpen(false);
  };
  return <CatalogMenu
  isCatalogOpen={isCatalogOpen}
  setIsCatalogOpen={setIsCatalogOpen}
  isLoading={isLoading}
  categories={categories}
  error={error}
  menuRef={menuRef}
  searchBlockRef={searchBlockRef}
  onMouseEnter ={openMenu}
  onFocusChangeAction={handleSearchFocusAction}
  />
}

export default CatalogMenuWrapper









  

  
