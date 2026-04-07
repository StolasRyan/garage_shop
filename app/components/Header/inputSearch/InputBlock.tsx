"use client";
import { SearchProduct } from "@/types/searchProduct";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

const InputBlock = ({
  onFocusChangeAction,
}: {
  onFocusChangeAction: (focused: boolean) => void;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groupProducts, setGroupProducts] = useState<
    { category: string; products: SearchProduct[] }[]
  >([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSearchData = async () => {
      if (query.length > 2) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/search?query=${query}`);
          const data = await response.json();
          setGroupProducts(data);
        } catch (e) {
          console.error("Failed to fetch product or category", e);
          setError("Failed to fetch product or category");
        } finally {
          setIsLoading(false);
        }
      } else {
        setGroupProducts([]);
      }
    };
    const debounce = setTimeout(fetchSearchData, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleIndputFocus = () => {
    setIsOpen(true);
    onFocusChangeAction(true);
  };

  const resetSearch = () => {
    setIsOpen(false);
    setQuery("");
  };

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      resetSearch();
    }
  };

  const handleInputBlur = () => {
    onFocusChangeAction(false);
  };

  return (
    <div className="min-w-65.25 relative grow" ref={searchRef}>
      <SearchInput
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleIndputFocus={handleIndputFocus}
        handleInputBlur={handleInputBlur}
      />
      {isOpen && (
        <div className="absolute mt-0 left-0 right-0  z-10 max-h-75 overflow-y-auto bg-white rounded-b border border-(--color-primary) border-t-0 shadow-inherit">
          {error ? (
            <div className="p-2 text-red-500 text-sm ">
              {error}
              <button
                onClick={() => setError(null)}
                className=" text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                reload
              </button>
            </div>
          ) : (
            <SearchResults
              query={query}
              groupProducts={groupProducts}
              isLoading={isLoading}
              resetSearch={resetSearch}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default InputBlock;
