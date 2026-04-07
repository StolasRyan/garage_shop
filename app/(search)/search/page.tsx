'use client'

import ProductsSection from "@/app/(products)/ProductsSection";
import ErrorComponent from "@/app/components/ErrorComponent";
import { Loader } from "@/app/components/Loader";
import { ProductCardProps } from "@/types/product";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const SearchPage = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <SearchResult/>
    </Suspense>
  )
}

const SearchResult = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || '';
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error, setError] = useState<{error: Error; userMessage: string} | null>(null);

    useEffect(()=>{
        const fetchSearchData = async () => {
            try {
              setIsLoading(true); 
              const response = await fetch(`api/search-full?query=${encodeURIComponent(query)}`);
              const data = await response.json();
              setProducts(data);
            } catch (e) {
      setError({
        error: e instanceof Error ? e : new Error(String(e)),
        userMessage: "Failed to upload search results",
      });
            } finally {
              setIsLoading(false);
            }
          };
          if(query){
          fetchSearchData();
          }
    },[query])

    if(isLoading) return <Loader/>
    if(error) return <ErrorComponent error={error.error} userMessage={error.userMessage}/>
  return (
    <div className="px-[max(12px, calc((100%-1208px)/2))] text-gray-500 my-20">
        <h1 className="text-2xl md:text-4xl text-left font-bold mb-6">
            Search Result
        </h1>
        <p className="text-sm md:text-base xl:text-2xl mb-6">By query <span className="text-orange-500">{query}</span></p>

        {products.length === 0 ? (
            <p className="text-lg">Nothing found </p>
        ): <ProductsSection title={''} products={products}/>}

    </div>
  )
}

export default SearchPage