import { buttonStyles } from "@/app/styles";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {

    if(totalPages <=1)return null;

    const getVisiblePages = ()=>{
        const maxVisible = 5;
        const pages = [];

        if(totalPages <= maxVisible){
            for(let i=1; i<=totalPages; i++){
                pages.push(i)
            }
        }else{
            let start = Math.max(1, currentPage - 2);
            const end = Math.min(totalPages, start + maxVisible -1);

            if(end - start + 1 < maxVisible){
                start = end - maxVisible + 1;
            }

            for(let i = start; i<=end; i++){
                pages.push(i)
            }
        }
        return pages;
    }


  return (
    <div className="flex justify-center items-center mt-12 p-4 border-t border-gray-300">
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50 duration-300 cursor-pointer disabled:cursor-not-allowed"
        >
          Back
        </button>
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={(e) =>{ 
                e.preventDefault()
                onPageChange(page)}}
            className={`p-2 w-10 rounded hover:bg-privary hover:text-white duration-300 cursor-pointer  ${
              currentPage === page ? buttonStyles.active : buttonStyles.inactive
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50 duration-300 cursor-pointer disabled:cursor-not-allowed"
        >
          Forward
        </button>
      </div>
    </div>
  );
};

export default Pagination;
