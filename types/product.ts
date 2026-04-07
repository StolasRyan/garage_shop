export interface ProductRating{
  average:number;
  count: number;
  rate: number;
  distribution:{
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
  }
}

export interface ProductCardProps {
  _id: number;
  id: number;
  img: string;
  title: string;
  description: string;
  basePrice: number;
  discountPercent?: number;
  rating:ProductRating;
  tags: string[];
  weight?: string;
  quantity: number;
  categories:string[];
  sku:string;
  brand:string;
  manufacturer:string;
  isHealthyFood:boolean;
  isNonGMO:boolean;
}