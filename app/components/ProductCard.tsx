
import { ProductCardProps } from "@/types/product";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import StarRaiting from "./StarRaiting";

const cardDiscountPercent = 6;
const ProductCard = ({
  img,
  description,
  basePrice,
  discountPercent = 0,
  rating,
  categories,
}: ProductCardProps) => {

  
  const isNewProduct = categories?.includes("new");
    const calculateFinalPrise = (price: number, discount: number): number => {
        return discount > 0 ? price * (1- discount / 100) : price
    }
    const calculatePriceByCard = (price: number, discount:number):number => {
        return calculateFinalPrise(price, discount)
    }

    const finalPrice = isNewProduct ? basePrice : calculateFinalPrise(basePrice, discountPercent);

    const priceByCard= isNewProduct ? basePrice :  calculatePriceByCard(finalPrice, cardDiscountPercent);

 

  return (
    <div className="flex flex-col justify-between w-40 rounded overflow-hidden bg-amber-50 md:w-56 xl:w-68 align-top p-0 hover:shadow-(--shadow-article) duration-300 border border-b-cyan-950">
      <div className="relative w-40 h-40 md:w-56 xl:w-68">
        <Image
          src={img}
          alt="Sale"
          fill
          className="object-contain"
          sizes="(max-width:768px) 160px, (max-width:1200px) 224px, 272px,"
        />
        <button className="w-8 h-8 p-2 bg-amber-50 hover:bg-amber-200 absolute top-0 right-2 opacity-50 rounded cursor-pointer duration-300">
          <Image
            src="heart.svg"
            alt="Favorites"
            width={24}
            height={24}
            className="object-contain   w-auto h-auto"
          />
        </button>
        {discountPercent > 0 && (
            <div className="absolute bg-amber-600 py-1 px-2 text-amber-200 bottom-2.5 left-2.5">
          -{discountPercent}%
        </div>
        )}
        
      </div>
      <div className="flex flex-col justify-between p-2 gap-y-2">
        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-col gap-x-1">
            <div className="flex flex-row gap-x-1 text-sm md:text-lg font-bold">
              <span>{formatPrice(priceByCard)}</span>
              <span>₽</span>
            </div>
            {discountPercent > 0 && (<p className="text-amber-600 texp-[8px] md:text-xs">By Card</p>)}
          </div>
          {finalPrice !== basePrice && cardDiscountPercent > 0 &&(
            <div className="flex flex-col gap-x-1">
              <div className="flex flex-row gap-x-1 text-xs md:text-base text-gray-500">
                <span>{formatPrice(finalPrice)} </span>
                <span>₽</span>
              </div>
              {cardDiscountPercent > 0 && (<p className="text-amber-600 text-[8px] md:text-xs">Simple price</p>)}
              
            </div>
          )}
          
        </div>
        <div className="h-13.5 text-xs md:text-base text-gray-600 line-clamp-3 md:line-clamp-2 leading-normal">
          {description}
        </div>
        {rating && (
            <StarRaiting rating={rating}/>
        )}
        <button className="border border-(--color-primary) hover:text-amber-50 hover:bg-amber-600 hover:border-transparent active:shadow-(--shadow-button-active) w-full h-10 rounded p-2 justify-center items-center text-(--color-primary) transition-all duration-300 cursor-pointer select-none">
          In Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
