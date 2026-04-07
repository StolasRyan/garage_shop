
import { ProductCardProps } from "@/types/product";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import StarRaiting from "./StarRaiting";
import Link from "next/link";
import uncknown from '../../public/images/unknown.png';
import { CONFIG } from "@/config/config";
import FavoriteButton from "./FavoriteButton";
import { calculateFinalPrise, calculatePriceByCard } from "@/utils/calcPrices";
import AddToCartButton from "./AddToCartButton";




const ProductCard = ({
  id,
  img,
  description,
  basePrice,
  discountPercent = 0,
  rating,
  tags,
  categories,
}: ProductCardProps) => {

  const src = img ? img : uncknown;
  
  const isNewProduct = tags?.includes("new");
   

    const finalPrice = isNewProduct ? basePrice : calculateFinalPrise(basePrice, discountPercent);

    const priceByCard= isNewProduct ? basePrice :  calculatePriceByCard(finalPrice, CONFIG.CARD_DISCOUNT_PERCENT);

    const ratingValue = rating?.average ?? 4.0 ;

    const productId = id;
    const mainCategory = categories?.[0];
    const productUrl = `/catalog/${encodeURIComponent(mainCategory)}/${productId}?desc=${encodeURIComponent(description.substring(0, 50))}`

  return (
    <div className="relative flex flex-col justify-between w-40 rounded-lg overflow-hidden bg-white  md:w-56 lg:w-68 h-87.25 align-top p-0 hover:shadow-(--shadow-article) duration-300 border border-b-cyan-950 ">
      <FavoriteButton productId={productId.toString()}/>
        <Link href={productUrl}>
      <div className="relative aspect-square w-40 h-40 md:w-56 xl:w-68 ">
      
        <Image
          src={src}
          alt="Product"
          fill
          className="object-contain"
          sizes="(max-width:768px) 160px, (max-width:1200px) 224px, 272px,"
          priority={false}
        />
        {discountPercent > 0 && (
            <div className="absolute bg-amber-600 py-1 px-2 text-amber-200 bottom-2.5 left-2.5">
          -{discountPercent}%
        </div>
        )}
     
        
      </div>
      <div className=" rounded-b-xl flex flex-col  p-2  h-47.25">
        <div className="flex flex-row justify-between items-start h-11.25">
          <div className="flex flex-col gap-x-1">
            <div className="flex flex-row gap-x-1 text-sm md:text-lg font-bold">
              <span>{formatPrice(priceByCard)}</span>
              <span> ₽</span>
            </div>
            {discountPercent > 0 && (<p className="text-amber-600 texp-[8px] md:text-xs">By Card</p>)}
          </div>
          {finalPrice !== basePrice && CONFIG.CARD_DISCOUNT_PERCENT > 0 &&(
            <div className="flex flex-col gap-x-1">
              <div className="flex flex-row gap-x-1 text-xs md:text-base text-gray-500">
                <span>{formatPrice(finalPrice)} </span>
                <span>₽</span>
              </div>
              {CONFIG.CARD_DISCOUNT_PERCENT > 0 && (<p className="text-amber-600 text-[8px] md:text-xs">Simple price</p>)}
              
            </div>
          )}
          
        </div>
        <div className="h-13.5 text-xs md:text-base text-gray-600 line-clamp-3 md:line-clamp-2 leading-normal">
          {description}
        </div>
        {<StarRaiting rating={ratingValue}/>}
        
      </div>
       </Link>
       <AddToCartButton productId={productId.toString()}/>
    </div>
  );
};

export default ProductCard;
