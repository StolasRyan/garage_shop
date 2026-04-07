"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconMenuMob from "../svg/IconMenuMob";
import { useAuthStore } from "@/store/authStore";
import IconBox from "../svg/IconBox";
import IconHeart from "../svg/IconHeart";
import IconCart from "../svg/IconCart";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";

const TopMenu = () => {
  const pathName = usePathname();
  const isFavoritePage = pathName === "/favorites";
  const isCatalog = pathName === "/catalog";
  const isCartPage = pathName === "/cart";
  const { user } = useAuthStore();
  const {totalItems, fetchCart} = useCartStore();

  const isManagerOrAdmin = user?.role === "manager" || user?.role === "admin";

  useEffect(()=>{
    if(user && !isManagerOrAdmin){
      fetchCart();
    }
  },[fetchCart, isManagerOrAdmin, user])

  return (
    <ul className="flex flex-row gap-x-6 items-end">
      <li>
        <Link
          href="/catalog"
          className="flex flex-col items-center gap-2.5 md:hidden w-11 "
        >
          <IconMenuMob isCatalogPage={isCatalog} />
          <span className={isCatalog ? "text-primary" : "text-[#414141]"}>
            Catalog
          </span>
        </Link>
      </li>

      {!isManagerOrAdmin && (
        <li>
          <Link
            href="/favorites"
            className="flex flex-col items-center gap-2.5  w-11 "
          >
            <IconHeart isActive={isFavoritePage} variant="primary" />
            <span className={isFavoritePage ? "text-primary" : "text-gray-600"}>
              Favorites
            </span>
          </Link>
        </li>
      )}

      <li className="flex flex-col items-center gap-1/2 w-11 cursor-pointer">
        <IconBox />
        <span className={isManagerOrAdmin ? "text-primary" : "text-gray-600"}>
          Orders
        </span>
      </li>
      {!isManagerOrAdmin && (
        <li className="relative flex flex-col items-center gap-2.5  w-11">
          <Link
            href="/cart"
            className="flex flex-col items-center gap-2.5 w-11"
          >
            <IconCart isActive={isCartPage} />
            {totalItems > 0 && (
              <span
              className="absolute -top-2 right-0 bg-primary text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center py-0.5 px-1"
              >
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
            <span className={isCartPage ? "text-primary" : "text-gray-600"}>
              Cart
            </span>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default TopMenu;
