export const createOrderAction = async(orderData:{
    deliveryAddress:{
        city: string,
        street: string,
        house: string,
        appartment?: string,
        additional?: string,
    };
    deliveryTime:{
        date: string,
        timeSlot: string,
    };
    cartItems:Array<{
        productId: string,
        quantity: number,
        price: number,
    }>;
    totalPrice: number;
    totalDiscount: number;
    finalPrice: number;
    totalBonuses: number;
    usedBonuses: number;
    paymentMethod: 'cash_on_delivery' | 'online';
})=>{
    try {
        const response = await fetch('/api/orders',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(orderData)
        })
        if(!response.ok) throw new Error('Failed to create order');

        return await response.json();
    } catch (error) {
        console.error('Failed to create order', error);
        throw error;
    }
}