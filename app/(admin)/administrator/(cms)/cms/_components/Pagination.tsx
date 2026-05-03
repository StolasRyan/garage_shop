"use client";

import { useCategoryStore } from "@/store/categoryStore";
import { CONFIG_BLOG } from "../CONFIG_BLOG";
import { useArticlesManagmentStore } from "@/store/articlesManagmentStore";

const Pagination = ({type = 'categories'}:{type?:string}) => {

  const categoryStore = useCategoryStore();
  const articlesManagmentStore = useArticlesManagmentStore();

  const { totalPages, totalItems, currentPage, itemsPerPage, setCurrentPage } =
   type === 'articles' ? articlesManagmentStore : categoryStore

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisibleItems = CONFIG_BLOG.MAX_VISIBLE_BUTTONS;

    if (totalPages <= maxVisibleItems) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= maxVisibleItems; i++) {
        buttons.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - maxVisibleItems + 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        buttons.push(i);
      }
    }

    return buttons.map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`flex items-center justify-center w-11 h-11 px-4 py-2 border  rounded cursor-pointer duration-300 ${page === currentPage ? "bg-primary/40 text-white hover:border-primary hover:bg-primary" : "border-gray-300 hover:bg-gray-50"}`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="px-6 py-4 border-t border-gray-200">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="text-sm text-gray-700">
          Showed {startItem}-{endItem} of {totalItems} items
          <span className="mx-2">•</span>
          Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded disabled:opacity-50 cursor-pointer hover:bg-gray-50 duration-300"
          >
            Back
          </button>
          {renderPageButtons()}
          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded disabled:opacity-50 cursor-pointer hover:bg-gray-50 duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
