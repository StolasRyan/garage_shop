export const formatDeliveryDateTime = (dateString: string, timeSlot: string):string => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('ru-RU', { day: 'numeric' });
    const month = date.toLocaleDateString('ru-RU', { month: 'long' });
    const year = date.getFullYear();
    const time = timeSlot.split('-')[0];

    return `${day} ${month} ${year} ${time}`;
};