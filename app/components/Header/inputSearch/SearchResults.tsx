import { TRANSLATIONS } from "@/utils/pathTranslations";
import Image from "next/image";
import Link from "next/link";
import HighLightText from "../HighLightText";
import MiniLoader from "../MiniLoader";
import { SearchResultsProps } from "@/types/searchResultsProps";

const SearchResults = ({ groupProducts, query, isLoading, resetSearch }: SearchResultsProps) => {
    if(isLoading) return <MiniLoader/>
    if(groupProducts.length > 0){
        return (
            <div className="p-2 flex flex-col gap-2.5">
              {groupProducts.map((group) => (
                <div key={group.category} className="flex flex-col gap-2.5">
                  <Link
                    href={`/catalog/${encodeURIComponent(group.category)}`}
                    onClick={resetSearch}
                    className="flex items-start gap-x-8 hover:bg-gray-100 p-1 rounded"
                  >
                    <div className="wrap-break-word ">
                      <HighLightText
                        text={
                          TRANSLATIONS[group.category] || group.category
                        }
                        highlight={query}
                      />
                    </div>
                    <Image
                      src="/menu.svg"
                      width={24}
                      height={24}
                      alt={TRANSLATIONS[group.category] || group.category}
                      className="shrink-0"
                    />
                  </Link>
                  <ul className="flex flex-col gap-2.5">
                    {group.products.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/catalog/${encodeURIComponent(group.category)}/ ${product.id}?desc=${encodeURIComponent(product.title.substring(0,50))}`}
                          className="flex items-start gap-x-4 hover:bg-gray-100 rounded"
                          onClick={resetSearch}
                        >
                          <HighLightText
                            text={product.title}
                            highlight={query}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
        )
    }
  if(query.length > 1){
    return (
        <div className="p-4 text-center text-gray-500 wrap-break-word">
              No results
            </div>
    )
  }
  return(
    <div className="p-4 text-center text-gray-500 wrap-break-word ">
              Enter more than 2 symbols for search
            </div>
  )
};

export default SearchResults