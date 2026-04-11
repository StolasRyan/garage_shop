export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'pending':
        case 'confirmed':
            return 'bg-yellow-100 text-yellow-600';
        case 'delivered':
            return 'bg-lime-200 text-lime-600';
        case 'cancelled':
            return 'bg-red-200 text-red-600';
        default:
            return 'bg-gray-200 text-gray-600';
    }
}