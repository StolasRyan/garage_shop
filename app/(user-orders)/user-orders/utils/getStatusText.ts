// export const getStatusText = (status: string): string => {
//     const statusMap: {[key: string]: string}={
//         'pending': 'Waiting',
//         'confirmed': 'In process',
//         'delivered': 'Delivered',
//         'cancelled': 'Returned',
//         'failed': 'Not Delivered'
//     }
//     return statusMap[status] || status;
// }

import { Order } from "@/types/order";

export const getStatusText = (order:Order):string =>{
    if(order.paymentMethod === 'online'){
        if(order.paymentStatus === 'paid' && order.status === 'confirmed'){
            return 'Confirmed';
        }else if(order.paymentStatus === 'failed'){
            return 'Not Payed';
        }else if(order.paymentStatus === 'waiting' && order.status === 'pending'){
            return 'In process';
        }
    }
    if(order.paymentMethod === 'cash_on_delivery'){
        if(order.status === 'pending' && order.paymentStatus === 'pending'){
            return 'Delivering'
        }else if(order.status === 'confirmed'){
            return 'Confirmed';
        }
    }

    const statusMap: {[key:string]:string} = {
        pending: 'In process',
        refund: 'Refund',
        returned: 'Returned',
        collected: 'Collected',
        delivering: 'Delivering',
        confirmed: 'Confirmed',
        delvered: 'Delivered',
        cancelled: 'Cancelled',
        failed: 'Not paid'
    };

    return statusMap[order.status] || order.status
}