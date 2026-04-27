import StarRaiting from "@/app/components/StarRaiting";
import { CONFIG } from "@/config/config";
import { ProductCardProps } from "@/types/product";
import { getReviewsWord } from "@/utils/getReviewsWord";
import ShareButton from "./_components/ShareButton";
import ImagesBlock from "./_components/ImagesBlock";
import ProductOffer from "./_components/ProductOffer";
import CartButton from "./_components/CartButton";
import Bonuses from "./_components/Bonuses";
import DiscountMessage from "./_components/DiscountMessage";
import AdditionalInfo from "./_components/AdditionalInfo";
import SimillarProducts from "./_components/SimillarProducts";
import SameBrandProducts from "./_components/SameBrandProducts";
import RatingDistribution from "./_components/RatingDistribution";
import ReviewsWrapper from "./_components/ReviewsWrapper";
import Sales from "@/app/(products)/Sales";
import FavoriteButton from "@/app/components/FavoriteButton";
import { calculateFinalPrice, calculatePriceByCard } from "@/utils/calcPrices";
import ProductTitle from "./_components/ProductTitle";

interface ProductPageContentProps {
  product: ProductCardProps;
  productId: string;
}

const ProductPageContent = ({
  product,
  productId,
}: ProductPageContentProps) => {

  const priceWithDiscount = calculateFinalPrice(product.basePrice, product.discountPercent || 0);
  const cardPrice = calculatePriceByCard(priceWithDiscount, CONFIG.BONUSES_PERCENT);
  const bonusesAmount = Math.round((priceWithDiscount * CONFIG.BONUSES_PERCENT) / 100);

  return (
    <div className="px-[max(12px,calc((100%-1208px)/2))] md:px-[max(16px, calc((100%-1208px)/2))] text-gray-600">
      <ProductTitle title={product.title} description={product.description}/>
      <div className="flex flex-row flex-wrap items-center gap-6 mb-4 md:mb-6">
        <div className="text-xs">sku:{product.sku}</div>
        <div className="flex flex-row flex-wrap items-center gap-2">
          <StarRaiting rating={product.rating.rate || 5} />
          <p className="text-sm underline">
            {product.rating.count || 0}{" "}
            {getReviewsWord(product.rating.count || 0)}
          </p>
        </div>
        <ShareButton title={product.title} />
        <FavoriteButton productId={productId} variant='onProductPage'/>
        {/* <Link href={'/favorites'} className="flex flex-row flex-wrap gap-2 items-center cursor-pointer">
          <HeartIcon className="h-5 w-5" />
          <p className="text-sm">Favorites</p>
        </Link> */}
      </div>
      <div className="flex flex-col gap-y-25 md:gap-y20 lg:gap-y-30">
        <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-10 w-full justify-center">
          <ImagesBlock product={product} />
          <div className="md:w-83.5 lg:w-94 flex flex-col ">
            <ProductOffer
              discountedPrice={priceWithDiscount}
              cardPrice={cardPrice}
            />
            <CartButton productId={productId}/>
            <Bonuses bonus={bonusesAmount} />
            <DiscountMessage
              productId={productId.toString()}
              productTitle={product.title}
              currentPrice={priceWithDiscount.toString()}
            />
            <AdditionalInfo
              brand={product.brand}
              manufacturer={product.manufacturer}
              weight={Number(product.weight)}
            />
          </div>
          <SimillarProducts currentProduct={product} />
        </div>
        <SameBrandProducts currentProduct={product} />
        <div>
          <h2 className="text-2xl lg:text-4xl text-left font-bold text-gray-600 mb-4 md:mb-8 lg:mb-10">
            Reviews
          </h2>
          <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-x-8 lg:gap-x-36">
            <RatingDistribution
              averageRating={product.rating.rate}
              distribution={product.rating.distribution}
            />
            <ReviewsWrapper productId={productId}/> 
          </div>
        </div>
        <Sales randomLimit={6} mobileItemsLimit={6} />
      </div>
    </div>
  );
};

export default ProductPageContent;
