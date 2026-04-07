export interface PriceFilterProps {
  basePath: string;
  category: string;
  setIsFilterOpenAction?: (value: boolean) => void;
  userId?:string | null;
  apiEndpoint?:string
}
export type PriceRange = {
  min: number;
  max: number;
}