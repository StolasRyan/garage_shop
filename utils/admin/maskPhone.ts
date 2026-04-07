export const maskedValue = (value: string) =>{
    if(!value) return '';
    
    const cleanedPhone = value.replace(/\D/g, '');

    let formatted = '+375 ';

    if(cleanedPhone.length > 3){
      formatted += `(${cleanedPhone.slice(3,5)}`
    }
    if(cleanedPhone.length > 5){
      formatted += `) ${cleanedPhone.slice(5,8)}`
    }
    if(cleanedPhone.length > 8){
      formatted += `-${cleanedPhone.slice(8,10)}`
    }
     if(cleanedPhone.length > 10){
      formatted += `-${cleanedPhone.slice(10,12)}`
    }

    return formatted
};
