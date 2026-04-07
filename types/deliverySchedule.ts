export interface DaySchedule {
    [timeSlot: string]: boolean
}

export interface Schedule{
    [day: string]: DaySchedule
}