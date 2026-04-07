export interface SearchInputProps{
    query: string;
    setQuery: (query: string) => void;
    handleSearch: () => void;
    handleIndputFocus: () => void;
    handleInputBlur: () => void;
}