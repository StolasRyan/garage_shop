import { ChevronUp, Eye, Star } from "lucide-react";
import React from "react";
import { SortField } from "../types";
import { useArticlesManagmentStore } from "@/store/articlesManagmentStore";

const TableHeader = () => {
  const {
    currentPage,
    sortField,
    sortDirection,
    searchQuery,
    setSortField,
    setSortDirection,
    loadArticles,
  } = useArticlesManagmentStore();

  const handleSort = async (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    await loadArticles({ page: currentPage, search: searchQuery });
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;

    return (
      <ChevronUp
        className={`w-4 h-4 ml-1 transition-transform duration-200${
          sortDirection === "desc" ? " rotate-180" : ""
        }`}
      />
    );
  };

  return (
    <div className="hidden lg:block border border-gray-200">
      <div className="grid lg:grid-cols-[32px_56px_100px_100px_100px_56px_128px_80px_80px_40px_100px]  xl:grid-cols-[32px_56px_170px_150px_150px_56px_128px_100px_120px_50px_100px] gap-2 px-4 py-4 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider items-center justify-between">
        <div></div>
        <div
          onClick={() => handleSort("numericId")}
          title="Sort by ID"
          className="text-center cursor-pointer hover:text-gray-700 flex items-center justify-center"
        >
          ID {renderSortIcon("numericId")}
        </div>

        <div
          onClick={() => handleSort("name")}
          title="Sort by Name"
          className="cursor-pointer hover:text-gray-700 flex items-center"
        >
          Name {renderSortIcon("name")}
        </div>

        <div
          onClick={() => handleSort("slug")}
          title="Sort by Slug"
          className="cursor-pointer hover:text-gray-700 flex items-center"
        >
          Slug {renderSortIcon("slug")}
        </div>

        <div
          onClick={() => handleSort("author")}
          title="Sort by author"
          className="text-center cursor-pointer hover:text-gray-700 flex items-center justify-center"
        >
          Author {renderSortIcon("author")}
        </div>

        <div
          onClick={() => handleSort("isFeatured")}
          title="Sort by feature"
          className="text-center cursor-pointer hover:text-gray-700 flex items-center justify-center"
        >
          <Star className="w-5 h-5" /> {renderSortIcon("isFeatured")}
        </div>

        <div
          onClick={() => handleSort("status")}
          title="Sort by status"
          className="cursor-pointer hover:text-gray-700 flex items-center"
        >
          Status {renderSortIcon("status")}
        </div>

        <div
          onClick={() => handleSort("categoryName")}
          title="Sort by category"
          className="text-center cursor-pointer hover:text-gray-700 flex items-center justify-center"
        >
          Category {renderSortIcon("author")}
        </div>

        <div
          onClick={() => handleSort("createdAt")}
          title="Sort by creation date"
          className="cursor-pointer hover:text-gray-700 flex items-center"
        >
          Created At {renderSortIcon("createdAt")}
        </div>

        <div
          onClick={() => handleSort("views")}
          title="Sort by views"
          className="cursor-pointer hover:text-gray-700 flex items-center"
        >
          <Eye className="w-5 h-5" />
          {renderSortIcon("views")}
        </div>
        <div className="text-center">Actions</div>
      </div>
    </div>
  );
};

export default TableHeader;
