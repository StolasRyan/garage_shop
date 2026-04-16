import { Order, OrderItem } from "@/types/order";
import { getPaymentStatusText } from "./getPaymentStatusText";
import { getMappedStatus } from "./getMappedStatus";
import { SimplifiedOrderData } from "@/types/exel";
import { downloadExcel, generateOrderExcel } from "./exelGenerator";




interface ProductData {
  title?: string;
  name?: string;
  weight?: number;
  brand?: string;
  manufacturer?: string;
}

interface EnrichedOrderItem extends Omit<OrderItem, 'name' | 'title'> {
  name: string;
  weight: number;
  brand: string;
  manufacturer: string;
}

const getProductName = (productData?: ProductData): string => {
  return productData?.title || "Неизвестный товар";
};

const fetchProductDetails = async(productId:string):Promise<ProductData> => {
    try {
        const response = await fetch(`/api/products/${productId}`);
        if(!response.ok){
            throw new Error(`HTTP Error: ${response.status}`)
        }
        return await response.json();
    } catch (error) {
        console.warn('Error fetching product details', error);
        return {};
    }
}

const enrichOrderItem = async(item:OrderItem):Promise<EnrichedOrderItem> => {
    const productDetails = await fetchProductDetails(item.productId);
    return {
        ...item,
        name: getProductName(productDetails),
        weight: productDetails.weight || 0,
        brand: productDetails.brand || '',
        manufacturer: productDetails.manufacturer || '',
    };
}

const prepareExcelData = (order: Order, items: EnrichedOrderItem[]): SimplifiedOrderData => ({
  order: {
    orderNumber: order.orderNumber,
    status: getMappedStatus(order),
    createdAt: order.createdAt,
    paymentMethod: order.paymentMethod,
    paymentStatus: getPaymentStatusText(order.paymentStatus),
    totalAmount: order.totalAmount,
    discountAmount: order.discountAmount,
    usedBonuses: order.usedBonuses,
    earnedBonuses: order.earnedBonuses,
    name: order.name,
    surname: order.surname,
    phone: order.phone,
    gender: order.gender,
    birthday: order.birthday,
    deliveryAddress: order.deliveryAddress,
    deliveryDate: order.deliveryDate,
    deliveryTimeSlot: order.deliveryTimeSlot,
  },
  items: items.map(item => ({
    productId: item.productId,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    totalPrice: item.totalPrice || item.price * item.quantity,
    weight: item.weight,
    brand: item.brand,
    manufacturer: item.manufacturer,
  })),
});

export async function exportOrderToExel(order:Order):Promise<void> {
    try {
        const enrichedItems = await Promise.all(order.items.map(enrichOrderItem));
        const exelData = prepareExcelData(order, enrichedItems);
        const exelBuffer = generateOrderExcel(exelData);
        downloadExcel(exelBuffer, `Order# ${order.orderNumber}`);
    } catch (error) {
        console.error('Error exporting to exel', error);
        throw new Error('Error exporting to exel');
    }
}