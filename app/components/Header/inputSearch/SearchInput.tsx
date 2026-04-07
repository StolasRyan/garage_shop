import { SearchInputProps } from "@/types/searchInputProps";
import Image from "next/image";


const SearchInput = ({query, setQuery, handleSearch, handleIndputFocus, handleInputBlur}:SearchInputProps) => {
  return (
    <div className="relative rounded border border-(--color-primary) shadow-(--shadow-button-default) leading-[150%]">
        <form  onSubmit={(e)=>{
          e.preventDefault();
          handleSearch();
        }}>
           <input
           value={query}
          type="text"
          placeholder="Find product"
          className="w-full h-10  py-2 px-4 outline-none   text-base text-gray-400 caret-(--color-primary)"
          onFocus={handleIndputFocus}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleInputBlur}
        />

        <button type="submit" 
          className="absolute top-2 right-2 w-6 h-6 cursor-pointer">
          <Image
          src="/search.svg"
          alt="Search"
          width={24}
          height={24}
          priority={false}
        />
        </button>
        </form>
      </div>
  )
}

export default SearchInput