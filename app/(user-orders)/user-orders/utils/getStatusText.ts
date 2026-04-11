export const getStatusText = (status: string): string => {
    const statusMap: {[key: string]: string}={
        'pending': 'Waiting',
        'confirmed': 'In process',
        'delivered': 'Delivered',
        'cancelled': 'Returned',
        'failed': 'Not Delivered'
    }
    return statusMap[status] || status;
}