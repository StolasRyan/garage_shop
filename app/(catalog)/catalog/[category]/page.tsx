import GenericListPage from "@/app/(products)/GenericListPage";
import { Loader } from "@/app/components/Loader";
import { TRANSLATIONS } from "@/utils/pathTranslations";
import { Suspense } from "react";
import DropFilter from "@/app/components/FilterComponents/DropFilter";
import PriceFilter from "@/app/components/FilterComponents/PriceFilter";
import FilterButtons from "@/app/components/FilterComponents/FilterButtons";
import FilterControls from "@/app/components/FilterComponents/FilterControls";
import fetchProductsByCategory from "@/app/(catalog)/catalog/[category]/fetchCategory";


export async function generateMatadate({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return {
    title: TRANSLATIONS[category] || category,
    description: `Description of products categories ${TRANSLATIONS[category] || category} "of garage shop"`,
  };
}

const CategoryPage = async ({
  params,
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
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const activeFilter = resolvedSearchParams.filter;
  const priceFrom = resolvedSearchParams.priceFrom;
  const priceTo = resolvedSearchParams.priceTo;
  const inStock = resolvedSearchParams.inStock === 'true';

  return (
    <div className="px-[max(12px, calc((100%-1208px)/2))] flex flex-col mx-auto">
      <h1 className="ml-3 xl:ml-0 text-4xl xl:text-5xl text-left font-bold text-gray-950 mb-6 md:mb-8 xl:mb-12 max-w-84 md:max-w-max leading-[150%]">
        {TRANSLATIONS[category] || category}
      </h1>
      <DropFilter 
      basePath={`/catalog/${category}`}
      category={category}
      />
      <div className="hidden xl:flex">
        <FilterButtons basePath={`/catalog/${category}`}/>
      </div>
      
      <div className="flex flex-row gap-x-10 justify-between">
        <div className="hidden xl:flex flex-col w-68 gap-y-10">
          <div className="h-11 bg-gray-200 rounded text-base font-bold text-gray-700 flex items-center p-2.5">
            Filter
          </div>
          <PriceFilter
          basePath={`/catalog/${category}`}
          category={category}
          />
        </div>
        <div className="flex flex-col">
          <div className="hidden xl:flex">
            <FilterControls 
      activeFilter={resolvedSearchParams.filter}
      basePath={`/catalog/${category}`}/>
          </div>
          
      <Suspense fallback={<Loader />}>
        <GenericListPage
          searchParams={Promise.resolve(resolvedSearchParams)}
          props={{
            fetchData: ({ pagination: { startIndex, perPage } }) =>
              fetchProductsByCategory(category, {
                pagination: { startIndex, perPage },
                filter: activeFilter,
                priceFrom,
                priceTo,
                inStock
              }),
            basePath: `/catalog/${category}`,
            contentType: "category",
            
          }}
        />
      </Suspense>
        </div>
         
      </div>
     
    </div>
  );
};



export default CategoryPage;
