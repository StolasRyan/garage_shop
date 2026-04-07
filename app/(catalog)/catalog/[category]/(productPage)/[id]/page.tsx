import ErrorComponent from "@/app/components/ErrorComponent";
import { ProductCardProps } from "@/types/product";
import { Metadata } from "next";
import { getProduct } from "../getProduct";
import ProductPageContent from "./ProductPageContent";

interface PageProps{
  params: Promise<{id:string}>;
  searchParams: Promise<{[key:string]:string | string[] | undefined}>
}

export async function generateMetadata({params, searchParams}:PageProps):Promise<Metadata> {
  try {
    const {id} = await params;
    const product = await getProduct(id);

    return{
      title: `${product.title}`,
      description: `Order ${product.title} with a best price. Quick delivery, best quality in GARAGE_SHOP.`,
      openGraph:{
        title: product.title,
        description:
            product.description || `Order ${product.title} with a best price.`,
        images: product.img ? [product.img[0]] : []
      }
    }
  } catch {
    const searchParamsObj = await searchParams;
    const productTitle = decodeURIComponent(String(searchParamsObj.desc));

    return{
      title:`${productTitle}`,
      description:`Order ${productTitle} with a best price.`
    }
  }
}



const ProductPage = async({params}:PageProps) => {

  let product:ProductCardProps;
  const productId = (await params).id;

  try {
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
  
  return <ProductPageContent product={product} productId={productId}/>
}

export default ProductPage