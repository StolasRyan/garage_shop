export const formatPrice = (price: number): string => {
        const num = Number(price);
        return num.toFixed(2).replace('.', ',');
    }