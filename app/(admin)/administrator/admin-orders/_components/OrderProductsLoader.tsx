'use client'

import ProductsSection from "@/app/(products)/ProductsSection";
import MiniLoader from "@/app/components/Header/MiniLoader";
import { ProductCardProps } from "@/types/product";
import { useEffect, useState } from "react";

interface OrderProduct{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
}
 
interface OrderProductsLoaderProps{
    orderItems: OrderProduct[];
    applyIndexStyles?: boolean;
    showFullOrder?: boolean;
    onTotalWeightCalculated?: (weight: number) => void
}

const OrderProductsLoader = ({
    orderItems,
    applyIndexStyles = true,
    onTotalWeightCalculated
}: OrderProductsLoaderProps) => {
    
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productPromises = orderItems.map(async (item)=>{
                    const response = await fetch(`/api/products/${item.productId}`);
                    const productData = await response.json();

                    return {
                        ...productData,
                        orderQuantity: item.quantity,
                    }
                });

                const productsData = await Promise.all(productPromises);
                setProducts(productsData);

                const weight = productsData.reduce((total, product, index) => {
                    const itemWeight = product.weight || 0;
                    const quantity = orderItems[index].quantity || 1;
                    return total + itemWeight * quantity;
                },0)

                if(onTotalWeightCalculated){
                    onTotalWeightCalculated(weight);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }

            
        }
        if(orderItems && orderItems.length > 0){
                fetchProducts();
            }else{
                setLoading(false);
            }
    },[onTotalWeightCalculated, orderItems])

    if(loading) return <MiniLoader/>

    if(products.length === 0) return <div className="text-center py-4"><div className="text-gray-600">No products found</div></div>
  return (
    <ProductsSection
    products={products}
    applyIndexStyles={applyIndexStyles}
    isAdminOrderPage={true}
    />
  )
}

export default OrderProductsLoader