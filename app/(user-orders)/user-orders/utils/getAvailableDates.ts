import { getThreeDaysDates } from "@/app/(admin)/administrator/delivery-times/utils/getThreeDaysDates";
import { AvailableDate } from "@/types/availableDate";
import { Schedule } from "@/types/deliverySchedule";


export const getAvailableDates = (schedule:Schedule):AvailableDate[]=>{
    const threeDaysDates = getThreeDaysDates();

    return threeDaysDates.map((dateString)=>{
            const dateSchedule = schedule[dateString as keyof typeof schedule];

            if(!dateSchedule){
                return null;
            }

            const totalSlots = Object.values(dateSchedule).filter(
                (available)=>available
            ).length;

            return{
                date: new Date(dateString),
                dateString,
                availableSlots: totalSlots
            }
    }).filter((date):date is AvailableDate => date !== null);
}