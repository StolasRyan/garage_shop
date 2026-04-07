import { SearchProduct } from "./searchProduct";

export interface SearchResultsProps{
    isLoading: boolean,
    query: string,
    resetSearch: () => void,
    groupProducts: { category: string; products: SearchProduct[] }[]
}