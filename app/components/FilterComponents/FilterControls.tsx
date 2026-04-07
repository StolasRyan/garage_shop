"use client";
import { FilterControlsProps } from "@/types/filterControlsProps";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const FilterControls = ({ basePath }: FilterControlsProps) => {
  const searchParams = useSearchParams();
  const minPrice = searchParams.get("priceFrom");
  const maxPrice = searchParams.get("priceTo");
  const activeFilter = searchParams.getAll("filter");
  function buildClearFiltersLink() {
    const params = new URLSearchParams();
    if (searchParams.get("page")) {
      params.set("page", searchParams.get("page") || "");
    }
    if (searchParams.get("itemsPerPage")) {
      params.set("itemsPerPage", searchParams.get("itemsPerPage") || "");
    }

    params.delete("filter");
    params.delete("priceFrom");
    params.delete("priceTo");

    return `${basePath}?${params.toString()}`;
  }

  const hasPriceFilter = minPrice || maxPrice;

  const buildClearPriceFilterLink = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("priceFrom");
    params.delete("priceTo");
    return `${basePath}?${params.toString()}`;
  };

  const activeFilterCount =
    (activeFilter
      ? Array.isArray(activeFilter)
        ? activeFilter.length
        : 1
      : 0) + (hasPriceFilter ? 1 : 0);

  const filterButtonText =
    activeFilterCount === 0
      ? "Filters"
      : activeFilterCount === 1
        ? "Filter 1"
        : `Filters ${activeFilterCount}`;

  return (
    <div className="flex flex-row flex-wrap gap-4 items-center">
      <div
        className={`h8 p-2 rounded text-xs flex items-center justify-center duration-300 cursor-not-allowed gap-x-2
          ${
            (activeFilter && activeFilter.length > 0) || hasPriceFilter
              ? "bg-(--color-primary) text-white"
              : "bg-gray-50 text-gray-400"
          }
          `}
      >
        {filterButtonText}
      </div>
      {hasPriceFilter && (
        <div className="h-8 p-2 rounded text-xs flex items-center justify-center duration-300 gap-x-2 bg-(--color-primary) text-white">
          <Link
            href={buildClearPriceFilterLink()}
            className="flex items-center gap-x-2"
          >
            Price{" "}
            {minPrice && maxPrice ? `from ${minPrice} to ${maxPrice}` : ""}
            <Image
              src={`/icon-closer.svg`}
              alt={"Clear filter by price"}
              width={24}
              height={24}
              className="object-contain w-6 h-6"
              sizes="24px"
              priority={false}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
        </div>
      )}
      {activeFilterCount > 0 && (
        <div
          className="h8 p-2 rounded text-xs flex items-center justify-center duration-300 gap-x-2 bg-(--color-primary) text-white">
          <Link
            href={buildClearFiltersLink()}
            className="flex items-center gap-x-2"
          >
            Drop filters
            <Image
              src={`/icon-closer.svg`}
              alt={`icon-closer.svg`}
              width={24}
              height={24}
              className="object-contain w-6 h-6"
              sizes="24px"
              priority={false}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default FilterControls;
