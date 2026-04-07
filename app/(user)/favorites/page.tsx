import GenericListPage from "@/app/(products)/GenericListPage";
import { Loader } from "@/app/components/Loader";
import { TRANSLATIONS } from "@/utils/pathTranslations";
import { Suspense } from "react";
import DropFilter from "@/app/components/FilterComponents/DropFilter";
import PriceFilter from "@/app/components/FilterComponents/PriceFilter";
import FilterButtons from "@/app/components/FilterComponents/FilterButtons";
import FilterControls from "@/app/components/FilterComponents/FilterControls"; 
import fetchFavorites from "./fetchFavorites";
import { getServerUserId } from "@/utils/getServerUserId";

const FavoritesPage = async ({
  searchParams,
}: {
  searchParams: 
  Promise<{ 
    page?: string; 
    itemsPerPage?: string;
    filter?: string | string[];
    priceFrom?: string;
    priceTo?: string;
    inStock?: string;
   }>;
  params: Promise<{ category: string }>;
}) => {
  const  category  = 'favorites';
  const resolvedSearchParams = await searchParams;
  const activeFilter = resolvedSearchParams.filter;
  const priceFrom = resolvedSearchParams.priceFrom;
  const priceTo = resolvedSearchParams.priceTo;
  const inStock = resolvedSearchParams.inStock === 'true';

  const userId = await getServerUserId();
  

  return (
    <div className="px-[max(12px, calc((100%-1208px)/2))] flex flex-col mx-auto">
      <h1 className="ml-3 xl:ml-0 text-4xl md:text-5xl xl:text-[64px] text-left font-bold text-gray-950 mb-8 md:mb-10 xl:mb-15 max-w-84 md:max-w-max leading-[150%]">
        {TRANSLATIONS[category] || (category.slice(0, 1).toUpperCase() + category.slice(1))} 
      </h1>
      <DropFilter 
      basePath={`/${category}`}
      category={category}
      userId={userId}
      apiEndpoint = 'users/favorites/products'
      />
      <div className="hidden xl:flex">
        <FilterButtons basePath={`/${category}`}/>
      </div>
      
      <div className="flex flex-row gap-x-10 justify-between">
        <div className="hidden xl:flex flex-col w-68 gap-y-10">
          <div className="h-11 bg-gray-200 rounded text-base font-bold text-gray-700 flex items-center p-2.5">
            Filter
          </div>
          <PriceFilter
          basePath={`/${category}`}
          category={category}
          userId={userId}
          apiEndpoint = 'users/favorites/products'
          />
        </div>
        <div className="flex flex-col">
          <div className="hidden xl:flex">
            <FilterControls 
      activeFilter={resolvedSearchParams.filter}
      basePath={`/${category}`}/>
          </div>
          
      <Suspense fallback={<Loader />}>
        <GenericListPage
          searchParams={Promise.resolve(resolvedSearchParams)}
          props={{
            fetchData: ({ pagination: { startIndex, perPage } }) =>
              fetchFavorites( {
                pagination: { startIndex, perPage },
                filter: activeFilter,
                priceFrom,
                priceTo,
                inStock,
                userId
              }),
            basePath: `/${category}`,
            contentType: "category",
            
          }}
        />
      </Suspense>
        </div>
         
      </div>
     
    </div>
  );
};



export default FavoritesPage;
