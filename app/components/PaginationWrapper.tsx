"use client";
import { CONFIG } from "@/config/config";
import { debounce } from "@/utils/debounce";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

function getItemsPerPageByWidth(contentType?: string) {
  const width = window.innerWidth;

  if (contentType) {
    return width < 640 ? 1 : 3;
  }

  if (width < 768) {
    return 2;
  }
  if (width < 1280) {
    return 3;
  }
  return CONFIG.ITEMS_PER_PAGE;
}

const PaginationWrapper = ({
  totalItems,
  basePath,
  currentPage,
  contentType,
}: {
  totalItems: number;
  basePath: string;
  currentPage: number;
  contentType?: string;
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(
    contentType === "article" ? 1 : CONFIG.ITEMS_PER_PAGE
  );
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const updateItemsPerPage = () => {
      const newItemsPerPage = getItemsPerPageByWidth(contentType);
      if (newItemsPerPage === itemsPerPage) return;
      setItemsPerPage(newItemsPerPage);

      const params = new URLSearchParams(searchParams.toString());
      params.set("itemsPerPage", newItemsPerPage.toString());
      params.set("page", "1");

      router.replace(`${basePath}?${params.toString()}`, { scroll: false });
    };
    updateItemsPerPage();

    const handleResize = debounce(updateItemsPerPage, 200);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerPage, basePath, router, searchParams, contentType]);
  return (
    <>
      <Pagination
        totalItems={totalItems}
        currentPage={currentPage}
        basePath={basePath}
        itemsPerPage={itemsPerPage}
        searchQuery={searchParams.toString()}
      />
    </>
  );
};

export default PaginationWrapper;
