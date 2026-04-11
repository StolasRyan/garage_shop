export const isTimeSlotPassed = (timeSlot: string, date: string):boolean => {
    const now = new Date();

    const todayString = now.toISOString().split('T')[0];
    if(todayString !== date){
        return false;
    }

    const [,endTime] = timeSlot.split('-');
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const slotEndTime = new Date();
    slotEndTime.setHours(endHours, endMinutes, 0, 0);
    const cuttoff = new Date(slotEndTime.getTime() - 30 * 60 * 1000);

    return now > cuttoff;
};