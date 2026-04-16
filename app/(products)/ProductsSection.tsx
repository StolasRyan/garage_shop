import { ProductsSectionProps } from "@/types/productsSection";
import ProductCard from "../components/ProductCard";
import ViewAllButton from "../components/ViewAllButton";

const ProductsSection = ({
  title,
  viewAllButton,
  products,
  mobileItemsLimit = 4,
  applyIndexStyles = true,
  contentType,
  isOrderPage,
  isAdminOrderPage 
}: ProductsSectionProps & {
  applyIndexStyles?: boolean;
  contentType?: string;
  isOrderPage?: boolean;
  isAdminOrderPage?: boolean;
}) => {
  const gridClasses =
    contentType === "category"
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <section>
      <div className={`flex flex-col px-[max(12px,calc((100%-1208px)/2))]`}>
        <div className="mb-4 md:mb-8 lg:mb-10 flex flex-row justify-between">
          <h2 className="text-2xl md:text-4xl text-left font-bold text-gray-600">
            {title}
          </h2>
          {viewAllButton && (
            <ViewAllButton
              btnText={viewAllButton.text}
              href={viewAllButton.href}
            />
          )}
        </div>
        {products && products.length > 0 ? (
          <ul
            className={`grid ${gridClasses} gap-4 md:gap-6 lg:gap-10 justify-items-center`}
          >
            {products.map((product, index) => (
              <li
                key={product._id}
                className={
                  applyIndexStyles
                    ? `${index >= mobileItemsLimit ? "hidden md:block" : ""}
                    ${index >= 3 ? "md:hidden lg:block" : ""}
                    ${index >= 4 ? "lg:hidden" : ""}`
                    : ""
                }
              >
                <ProductCard {...product} isOrderPage={isOrderPage} isAdminOrderPage={isAdminOrderPage}/>
              </li>
            ))}
          </ul>
        ) : (
          <div>No products found</div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
