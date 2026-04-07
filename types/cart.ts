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
    hasLoyaltyCard: boolean
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

export interface CartSideBarProps extends CartBaseProps, BonusesSectionProps{}