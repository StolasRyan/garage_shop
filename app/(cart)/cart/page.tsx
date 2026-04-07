"use client";
import {
  getOrderCartAction,
  getUserBonusesAction,
  removeMultipleOrderItemsAction,
  updateOrderItemQuantityAction,
} from "@/actions/orderActions";
import { Loader } from "@/app/components/Loader";
import { useCartStore } from "@/store/cartStore";
import { ProductCardProps } from "@/types/product";
import { useCallback, useEffect, useState } from "react";
import CartHeader from "./_components/CartHeader";
import CartControls from "./_components/CartControls";
import CartItem from "./_components/CartItem";
import { usePricing } from "@/app/hooks/usePricing";
import CartSideBar from "./_components/CartSideBar";

const CartPage = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [productsData, setProductsData] = useState<{
    [key: string]: ProductCardProps;
  }>({});
  const [bonusesCount, setBonusesCount] = useState<number>(0);
  const [hasLoyaltyCard, setHasLoyaltyCard] = useState<boolean>(false);
  const [removedItems, setRemovedItems] = useState<string[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [useBonuses, setUseBonuses] = useState<boolean>(false);
  const { cartItems, updateCart } = useCartStore();
  const visibleCartItems = cartItems.filter(
    (item) => !removedItems.includes(item.productId),
  );

  const avilebleCartItems = visibleCartItems.filter((item) => {
    const product = productsData[item.productId];
    return product && product.quantity > 0;
  });

  const priceData = usePricing({
    avilebleCartItems,
    productsData,
    hasLoyaltyCard,
    bonusesCount,
    useBonuses,
  });

  const {
    totalPrice,
    totalMaxPrice,
    totalDiscount,
    finalPrice,
    totalBonuses,
    isMinimumReached,
  } = priceData;

  const commonSideBarProps = {
    bonusesCount,
    useBonuses,
    onUseBonusesChange: setUseBonuses,
    totalPrice,
    visibleCartItems,
    totalMaxPrice,
    totalDiscount,
    finalPrice,
    totalBonuses,
    isMinimumReached,
  };

  const fetchCartAndProducts = async () => {
    setIsCartLoading(true);
    try {
      const userData = await getUserBonusesAction();
      setBonusesCount(userData.bonusesCount);
      setHasLoyaltyCard(userData.hasLoyaltyCard);

      const cartItems = await getOrderCartAction();
      updateCart(cartItems);

      const productPromises = cartItems.map(async (item) => {
        try {
          const response = await fetch(`/api/products/${item.productId}`);
          const product = await response.json();
          return { productId: item.productId, product };
        } catch (error) {
          console.error(`Error fetching product ${item.productId}`, error);
          return null;
        }
      });

      const productsResults = await Promise.all(productPromises);

      const productsMap: { [key: string]: ProductCardProps } = {};

      productsResults.forEach((result) => {
        if (result && result.product) {
          productsMap[result.productId] = result.product;
        }
      });

      setProductsData(productsMap);
    } catch (error) {
      console.error("Error fetching cart and products", error);
    } finally {
      setIsCartLoading(false);
    }
  };

  useEffect(() => {
    fetchCartAndProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuantityUpdate = useCallback(
    async (productId: string, newQuantity: number) => {
      const updatedCartItems = cartItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item,
      );

      updateCart(updatedCartItems);

      try {
        await updateOrderItemQuantityAction(productId, newQuantity);
      } catch (error) {
        console.error(`Error updating quantity for products`, error);
        updateCart(cartItems);
      }
    },
    [cartItems, updateCart],
  );

  const handleRemoveSelected = async () => {
    if (selectedItems.length === 0) return;

    setRemovedItems((prev) => [...prev, ...selectedItems]);

    const updatedCartItems = cartItems.filter(
      (item) => !selectedItems.includes(item.productId),
    );
    updateCart(updatedCartItems);

    try {
      removeMultipleOrderItemsAction(selectedItems);
      setSelectedItems([]);
    } catch (error) {
      console.error(`Error removing selected items`, error);
      setRemovedItems((prev) =>
        prev.filter((id) => !selectedItems.includes(id)),
      );
      updateCart(cartItems);
    }
  };

  const selectAllItems = () => {
    setSelectedItems(visibleCartItems.map((item) => item.productId));
  };

  const deselectAllItems = () => {
    setSelectedItems([]);
  };

  const handleItemSelection = useCallback(
    (productId: string, isSelected: boolean) => {
      if (isSelected) {
        setSelectedItems((prev) => [...prev, productId]);
      } else {
        setSelectedItems((prev) => prev.filter((id) => id !== productId));
      }
    },
    [],
  );

  const isAllSelected =
    selectAllItems.length > 0 &&
    selectedItems.length === visibleCartItems.length;

  if (isCartLoading) return <Loader />;

  if (visibleCartItems.length === 0 && removedItems.length === 0) {
    return (
      <div className="conteiner mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Cart</h1>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-[max(12px,calc((100%-1208px)/2))] md:px-[max(16px,calc((100%-1208px)/2))] text-gray-600 mx-auto ">
      <CartHeader itemCount={visibleCartItems.length} />
      <CartControls
        isAllSelected={isAllSelected}
        selectedItemsCount={selectedItems.length}
        onSelectAll={selectAllItems}
        onDeselectAll={deselectAllItems}
        onRemoveSelected={handleRemoveSelected}
      />
      <div className="flex flex-col md:flex-row gap-8 xl:gap-x-15">
        <div className="flex flex-col gap-y-6">
          {visibleCartItems.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              productData={productsData[item.productId]}
              isSelected={selectedItems.includes(item.productId)}
              onSelectionChange={handleItemSelection}
              onQuantityUpdate={handleQuantityUpdate}
              hasLoyaltyCard={hasLoyaltyCard}
            />
          ))}
        </div>

       <CartSideBar {...commonSideBarProps}/>
      </div>
    </div>
  );
};
export default CartPage;
