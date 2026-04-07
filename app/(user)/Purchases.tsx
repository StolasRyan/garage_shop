'use client'
import { CONFIG } from "@/config/config";
import ProductsSection from "../(products)/ProductsSection";
import fetchPurchases from "./fetchPurchases";
import ErrorComponent from "../components/ErrorComponent";
import { useEffect, useState } from "react";
import { ProductCardProps } from "@/types/product";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "../components/Loader";

const Purchaes =  () => {
  const [shouldShow, setShouldShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError]= useState<Error | null>(null);
  const [items, setItems] = useState<ProductCardProps[]>([]);
  const {user, isAuth} = useAuthStore();

  useEffect(()=>{
    const checkAccessAndFetchData = async()=>{
      try {
        const hasAccess = isAuth && user?.role === 'user'
        setShouldShow(hasAccess);

        if(hasAccess){
          const {items:purchases} = await fetchPurchases({
            userPurchsesLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
          });
          setItems(purchases)
        }

      } catch (error) {
        setError(error instanceof Error ? error : new Error(String(error)))
      }finally{
        setLoading(false)
      }
    }
    checkAccessAndFetchData()
  },[isAuth, user]);

  if(!shouldShow) return null;

  if(loading) return <Loader/>

  if(error){
    return (
      <ErrorComponent
      error={error instanceof Error ? error : new Error(String(error))}
      userMessage="Failed to upload your's purchases."
      />
    )
  }

    return (
      <ProductsSection
        title="Purchases"
        viewAllButton={{ text: "Purchased before", href: "purchases" }}
        products={items}
        compact
      />
    );

};

export default Purchaes;
