"use client";
import { useAuthStore } from "@/store/authStore";
import IconHeart from "./svg/IconHeart";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFavorites } from "../hooks/useFavorite";

interface FavoriteButtonProps {
    productId: string;
    variant?: 'default' | 'primary' | 'onProductPage'
}

const FavoriteButton = ({ productId, variant }:FavoriteButtonProps) => {
  const router = useRouter();
  const { isAuth } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toogleFavorites, isFavorite, isLoading } = useFavorites();

  const handleClick = async () => {
    if (!isAuth) {
      router.push("/login");
      return;
    }

    setIsProcessing(true);
    try {
      await toogleFavorites(productId);
    } catch (error) {
      console.error("Error toogling favorite:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const isActive = isAuth && isFavorite(productId);
  const disabled = isLoading || isProcessing;

  const getButtonClasses=()=>{
    const baseClasses = `
    flex items-center justify-center
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer '}
    `;
    if(variant === 'onProductPage'){
        return `${baseClasses} w-auto h-5`
    }
    return `${baseClasses} w-8 h-8 p-2 bg-white/10 hover:bg-red-100 absolute top-1 right-1  rounded duration-300 z-10 hover:scale-110`
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={getButtonClasses()}
        title={isActive ? "Remove from favorites" : "Add to favorites"}
    >
      <IconHeart isActive={isActive} />
      {variant ==='onProductPage' && (<p className="text-sm select-none ml-2">Add to favorites</p>)}
    </button>
  );
};

export default FavoriteButton;
