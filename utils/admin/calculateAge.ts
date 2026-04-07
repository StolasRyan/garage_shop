export const calculateAge=(birthday:string):number=>{
    if(!birthday) return 0 ;

    const birthDay = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDay.getFullYear();
    const monthDiff = today.getMonth() - birthDay.getMonth();

    if(monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDay.getDate())
    ){
        age--
    }
    return age
}