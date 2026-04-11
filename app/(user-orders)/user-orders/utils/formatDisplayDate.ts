export const formatDisplayDate = (date: Date):string => {
    const today = new Date();
    const tommorow = new Date();
    tommorow.setDate(today.getDate() + 1);

    if(date.toDateString() === today.toDateString()){
        return 'Today';
    }else if(date.toDateString() === tommorow.toDateString()){
        return 'Tommorow';
    }else{
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
        });
    }
};