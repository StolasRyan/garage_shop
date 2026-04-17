import { ProductCardProps } from "@/types/product";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import StarRaiting from "./StarRaiting";
import Link from "next/link";
import { CONFIG } from "@/config/config";
import FavoriteButton from "./FavoriteButton";
import { calculateFinalPrice, calculatePriceByCard } from "@/utils/calcPrices";
import AddToCartButton from "./AddToCartButton";
import IconCart from "./svg/IconCart";

const cardDiscountPercent = CONFIG.CARD_DISCOUNT_PERCENT;
const ProductCard = ({
  id,
  img,
  description,
  basePrice,
  discountPercent = 0,
  rating,
  categories,
  quantity,
  isLowStock,
  insufficientStock,
  orderQuantity,
  isOrderPage = false,
  index = 0,
  isAdminOrderPage = false,
}: ProductCardProps & {
  isOrderPage?: boolean;
  index?: number;
  isAdminOrderPage?: boolean;
}) => {
  const finalPrice = calculateFinalPrice(basePrice, discountPercent);
  const priceByCard = calculatePriceByCard(finalPrice, cardDiscountPercent);
  const showTwoPrices =
    !isOrderPage && discountPercent > 0 && cardDiscountPercent > 0;

  const displayPrice = showTwoPrices ? priceByCard : finalPrice;

  const productId = id;
  const mainCategory = categories?.[0];
  const productUrl = `/catalog/${encodeURIComponent(mainCategory)}/${productId}}`;
  const isPriorityImage = index < 4;
  return (
    <div className={`relative flex flex-col justify-between w-40 rounded-lg overflow-hidden bg-white  md:w-56 lg:w-68 ${isAdminOrderPage ? 'h-auto' : 'h-87.25'} align-top p-0 hover:shadow-article duration-300 border border-b-cyan-950 `}>
      {orderQuantity && (
        <div className="absolute top-2 left-2 text-gray-600 flex flex-col md:flex-row items-center p-1 bg-white/50 rounded justify-center gap-1 text-lg font-bold z-10">
          <IconCart />
          {orderQuantity}
        </div>
      )}
      {(isLowStock || insufficientStock) && (
        <div
          className={`absolute top-2 left-1/2 transform -translate-x-1/2 p-1 rounded text-[8px] md:px-2 md:text-xs z-10 ${
            insufficientStock
              ? "bg-red-600 text-white"
              : "bg-amber-600 text-amber-200"
          }`}
        >
          {insufficientStock ? "Out of stock" : `Left: ${quantity}`}
        </div>
      )}
      {!isAdminOrderPage && <FavoriteButton productId={productId.toString()} />}
      <Link href={productUrl}>
        <div className="relative aspect-square w-40 h-40 md:w-56 xl:w-68 ">
          <Image
            src={img}
            alt="Product"
            fill
            className="object-contain"
            sizes="(max-width:768px) 160px, (max-width:1200px) 224px, 272px,"
            priority={isPriorityImage}
          />
          {!isAdminOrderPage && !isOrderPage && discountPercent > 0 && (
            <div className="absolute bg-amber-600 py-1 px-2 text-amber-200 bottom-2.5 left-2.5">
              -{discountPercent}%
            </div>
          )}
        </div>
        <div
          className={`rounded-b-xl flex flex-col  p-2  ${isAdminOrderPage ? "h-auto" : "h-47.25"}`}
        >
          {!isAdminOrderPage && (
            <div className="flex flex-row justify-between items-start h-11.25">
              <div className="flex flex-col gap-x-1">
                <div className="flex flex-row gap-x-1 text-sm md:text-lg font-bold">
                  <span>{formatPrice(displayPrice)}</span>
                  <span> ₽</span>
                </div>
                {showTwoPrices && (
                  <p className="text-amber-600 texp-[8px] md:text-xs">
                    By Card
                  </p>
                )}
              </div>
              {showTwoPrices && (
                <div className="flex flex-col gap-x-1">
                  <div className="flex flex-row gap-x-1 text-xs md:text-base text-gray-500">
                    <span>{formatPrice(finalPrice)} </span>
                    <span>₽</span>
                  </div>
                  {CONFIG.CARD_DISCOUNT_PERCENT > 0 && (
                    <p className="text-amber-600 text-[8px] md:text-xs">
                      Simple price
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
          {isAdminOrderPage && (
            <div className="text-xs mb-2">{categories[0].slice(0,1).toUpperCase() + categories[0].slice(1)}</div>
          )}
          <div className="h-13.5 text-xs md:text-base text-gray-600 line-clamp-3 md:line-clamp-2 leading-normal">
            {description}
          </div>
          {!isAdminOrderPage && <StarRaiting rating={rating.rate || 5.0} />}
        </div>
      </Link>
      {!isAdminOrderPage && (
        <AddToCartButton
          productId={productId.toString()}
          availableQuantity={quantity}
        />
      )}
    </div>
  );
};

export default ProductCard;
