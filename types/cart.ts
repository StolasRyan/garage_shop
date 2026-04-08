import { DeliveryAdress, DeliveryTime } from "./order";
import { ProductCardProps } from "./product";

export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: Date;
}


export interface CartItemProps{
    item: CartItem;
    productData: ProductCardProps;
    isSelected: boolean;
    onSelectionChange: (productId: string, isSelected: boolean) => void;
    onQuantityUpdate: (productId: string, newQuantity: number) => void;
}

export interface CartSummaryProps {
  deliveryData?:{
    address: DeliveryAdress;
    time: DeliveryTime;
    isValid: boolean;
  } | null;
  productsData?: {[key: string]: ProductCardProps};
}

export interface CartSidebarProps{
  onCheckout?: () => void;
  deliveryData?:{
    address: DeliveryAdress;
    time: DeliveryTime;
    isValid: boolean;
  } | null;
  productsData?: {[key: string]: ProductCardProps};
}
export interface CartBaseProps{
  visibleCartItems: CartItem[];
  totalMaxPrice: number;
  totalDiscount: number;
  finalPrice: number;
  totalBonuses: number;
  isMinimumReached: boolean
}

export interface BonusesSectionProps{
    bonusesCount: number;
    useBonuses: boolean;
    onUseBonusesChange: (use: boolean) => void;
    totalPrice: number;
}
