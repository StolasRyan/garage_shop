import { ProductsSectionProps } from "@/types/productsSection";
import ProductCard from "../components/ProductCard";
import ViewAllButton from "../components/ViewAllButton";

const ProductsSection = ({
  title,
  viewAllButton,
  products,
  compact = false,
  applyIndexByStyles = true,
  contentType
}: ProductsSectionProps & { applyIndexByStyles?: boolean; contentType?: string}) => {
  
  const gridClasses = contentType === 'category' ? 'grid-cols-2 md:grid-cols-3' :  'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'

  return (
    <section>
      <div
        className={`flex flex-col  justify-center xl:max-w-302 ${
          compact ? "px-[max(12px,calc((100%-1208px)/2))]" : "mt-20"
        }`}
      >
        <div className="mb-4 md:mb-8 lg:mb-10 flex flex-row justify-between">
          <h2 className="text-2xl md:text-4xl text-left font-bold">{title}</h2>
          {viewAllButton && (<ViewAllButton
            btnText={viewAllButton.text}
            href={viewAllButton.href}
          />)}
          
        </div>
        {products && products.length > 0 ? (
          <ul className={`px-8 grid ${gridClasses} gap-4 md:gap-6 lg:gap-7 xl:gap-8`}>
          {products.map((product, index) => (
            <li
              key={product._id}
              className={compact ? `${index >= 4 ? "hidden" : ""}
                    ${index >= 3 ? "md:hidden xl:block" : ""}
                    ${index >= 4 ? "xl:hidden" : ""}
                    ` : ''}
            >
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
        ):(
          <div>No products found</div>
        )}
        
      </div>
    </section>
  );
};

export default ProductsSection;
