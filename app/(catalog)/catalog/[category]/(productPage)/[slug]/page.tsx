import ErrorComponent from "@/app/components/ErrorComponent";
import { ProductCardProps } from "@/types/product";
import { Metadata } from "next";
import { getProduct } from "../getProduct";
import ProductPageContent from "./ProductPageContent";
import { baseUrl } from "@/utils/baseUrl";

interface PageProps{
  params: Promise<{category:string, slug: string}>;
}

function extractIdFromSlug(slug: string): string {
  const match = slug.match(/^(\d+)/);
  return match ? match[1] : slug;
}

export async function generateMetadata({params}:PageProps):Promise<Metadata> {
  try {
    const {category, slug} = await params;
    const productId = extractIdFromSlug(slug);
    const product = await getProduct(productId);

    const canonicalUrl = `${baseUrl}/catalog/${category}/${slug}`

    return{
      title: `${product.title}`,
      description: `Order ${product.title} with a best price. Quick delivery, best quality in GARAGE_SHOP.`,
      metadataBase: new URL(baseUrl),
      alternates:{
        canonical: canonicalUrl
      }, 
      openGraph:{
        title: product.title,
        description:
            product.description || `Order ${product.title} with a best price.`,
        images: product.img ? [product.img[0]] : [],
        url: canonicalUrl
      }
    }
  } catch {
    return{
      title:`Product`,
      description:`Product page`,
      metadataBase: new URL(baseUrl), 
    }
  }
}



const ProductPage = async({params}:PageProps) => {

  let product:ProductCardProps;
  try {
    const {slug} = await params;
    const productId = extractIdFromSlug(slug);
    product = await getProduct(productId)
  } catch (error) {
    return(
      <ErrorComponent
      error={error instanceof Error ? error : new Error(String(error))}
      userMessage="Failed to upload proct's data"
      />
    )
  }

  if(!product){
    return(
      <ErrorComponent
      error={new Error('Product not found')}
      userMessage="Product not found"
      />
    )
  }
  
  return <ProductPageContent product={product} productId={product.id.toString()}/>
}

export default ProductPage