export function validateBirthDate(dateStr: string):{isValid:boolean, error?:string}{
    if(!dateStr || dateStr.length < 10){
        return {isValid:false, error:"Enter full date"}
    }

    const [day,month,year] = dateStr.split('.').map(Number);

    const date = new Date(year,month-1,day);
    
    const today = new Date();

    const minDate = new Date(1900,0,1);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 14);

    if(date.getDate() !== day
     || date.getMonth() !== month-1 
     || date.getFullYear() !== year){
        return {isValid:false, error:"Enter correct date"}
     }

     if(date < minDate){
        return {isValid:false, error:`You are older than ${new Date().getFullYear() - minDate.getFullYear()} years?`}
     }

     if(date > today){
        return {isValid: false, error:"Come back in time you will be 14 years old"}
     }

     if(date > maxDate){
        return {isValid: false, error:"You must be at least 14 years old"}
     }

    return {isValid:true}
}