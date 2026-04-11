import { Order, OrderItem } from "@/types/order";
import { ProductCardProps } from "@/types/product";
import { useEffect, useState } from "react";



export const useOrderProducts = (order:Order, productsData?:ProductCardProps[] ) =>{
    const [orderProducts, setOrderProducts] = useState<ProductCardProps[]>([]);
    const [stockWarnings, setStockWarnings] = useState<string[]>([]);

    useEffect(()=>{
        const processProducts = () => {
            try {
                const warnings: string[] = [];
                if(productsData && productsData.length > 0){
                  const  processedProducts = order.items.map( (item: OrderItem, index: number) => {
                        const productData = productsData[index];
                        if(!productData) return null;

                

                        const availableQuantity = productData.quantity;
                        const orderQuantity = item.quantity;
                        const isLowStock = availableQuantity < orderQuantity;
                        const insufficientStock = availableQuantity === 0;

                        if(isLowStock){
                            if(insufficientStock){
                                warnings.push(`${productData.title} is out of stock`);
                            }else{
                                warnings.push(`Product ${productData.title} ${availableQuantity} left in stock. In order ${orderQuantity}`);
                            }
                        }

                        const productCardData = {
                            _id: productData._id,
                            id: productData.id,
                            img: productData.img,
                            title: productData.title,
                            description: productData.description,
                            basePrice: item.price,
                            discountPercent: item.discountPercent || 0,
                            orderQuantity: orderQuantity,
                            rating: productData.rating,
                            quantity: productData.quantity,
                            isLowStock,
                            insufficientStock,
                            categories: productData.categories
                        } as ProductCardProps;
                        return productCardData;
                    }
                )
                const validProducts = processedProducts.filter(
                    (product): product is ProductCardProps => product !== null
                );
                setOrderProducts(validProducts);
                setStockWarnings(warnings);

            } 
            } catch (error) {
                console.error("Failed to fetch order products", error);
            }
        }
        processProducts();
    },[order, productsData]);

    return {orderProducts, stockWarnings}
}