import ProductsSection from "@/app/(products)/ProductsSection";
import { ProductCardProps } from "@/types/product"




interface SameBrandProductsProps{
    currentProduct:ProductCardProps
}

const SameBrandProducts = async({currentProduct}:SameBrandProductsProps) => {
    if(!currentProduct.brand) return null;

    let sameBrandProducts:ProductCardProps[]=[];

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLICK_BASE_URL}/api/products/brand?brand=${currentProduct.brand}&productId=${currentProduct.id}`,
            {next:{revalidate:3600}}
        )

        if(response.ok){
            const data = await response.json();
            sameBrandProducts = data.sameBrandProducts || [];
        }

    } catch (error) {
        console.error("Failed to fetch same brand products", error)
    }

    if(!sameBrandProducts || sameBrandProducts.length === 0) return null;
  return (
    <ProductsSection
    title="Buying with this product:"
    products={sameBrandProducts}
    />
  )
}

export default SameBrandProducts