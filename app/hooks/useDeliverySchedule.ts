import { Schedule } from "@/types/deliverySchedule";
import { useCallback, useState } from "react";
import { getThreeDaysDates } from "../(admin)/administrator/delivery-times/utils/getThreeDaysDates";
import { convertTimeToMinutes } from "../(admin)/administrator/delivery-times/utils/convertTimeToMinutes";

export function useDeliverySchedule() {
  const [schedule, setSchedule] = useState<Schedule>({});
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );
  const [error, setError] = useState("");
  const [startTime, setStartTime] = useState("08-00");
  const [endTime, setEndTime] = useState("14-00");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const dates = getThreeDaysDates();

  const showMessage = useCallback(
    (text: string, type: "success" | "error" = "success") => {
      setMessage(text);
      setMessageType(type);
    },
    [],
  );

  const initializeEmptySchedule = useCallback(() => {
    const emptySchedule: Schedule = {};
    dates.forEach((date) => {
      emptySchedule[date] = {};
    });
    setSchedule(emptySchedule);
  }, [dates]);

  const fetchDeliveryTimes = useCallback(async ()=>{
    try {
        const response = await fetch("/api/delivery-times");
        const data = await response.json();

        if(data.schedule && Object.keys(data.schedule).length > 0){
            const loadedSchedule = data.schedule as Schedule;

            const updateSchedule = dates.reduce<Schedule>((acc, date)=>{
                acc[date] = loadedSchedule[date] ? {...loadedSchedule[date]} : {};
                return acc;
            },{});
            setSchedule(updateSchedule);

            const slots = new Set(
                dates.flatMap((date)=>Object.keys(updateSchedule[date] || {}))
            );

            setTimeSlots(Array.from(slots));
        }else{
            initializeEmptySchedule();
        }
    } catch  {
        setError('Failed to fetch delivery time graphics');
        initializeEmptySchedule();
    }finally{
        setIsLoading(false);
    }
  },[dates, initializeEmptySchedule]);

  const addTimeSlot = useCallback(()=>{
    setError('');

    if(!startTime.trim() || !endTime.trim()){
        setError('Please enter start and end time');
        return;
    }

    const startMinutes = convertTimeToMinutes(startTime);
    const endMinutes = convertTimeToMinutes(endTime);

    if(startMinutes >= endMinutes){
        setError('Start time must be before end time');
        return;
    }

    const timeSlotValue = `${startTime}-${endTime}`;

    const hasOverlap = timeSlots.some((existingSlot)=>{
        const [existingStart, existingEnd] = existingSlot.split('-');
        const existingStartMinutes = convertTimeToMinutes(existingStart);
        const existingEndMinutes = convertTimeToMinutes(existingEnd);

        return(
            (startMinutes >= existingStartMinutes && startMinutes < existingEndMinutes) ||
            (endMinutes > existingStartMinutes && endMinutes <= existingEndMinutes) ||
            (startMinutes <= existingStartMinutes && endMinutes >= existingEndMinutes)
        )
    });

    if(hasOverlap){
        setError('Time slot overlaps with existing time slot');
        return;
    };

    const updatedTimeSlots = [...timeSlots, timeSlotValue];
    setTimeSlots(updatedTimeSlots);

    const updatedSchedule: Schedule = {...schedule};

    dates.forEach((date)=>{
        if(!updatedSchedule[date]) updatedSchedule[date] = {};
        updatedSchedule[date][timeSlotValue] = true;
    });

    setSchedule(updatedSchedule);
    showMessage('Time slot added successfully for all dates');
  },[dates, endTime, schedule, showMessage, startTime, timeSlots])

  const updateTimeSlotsStatus = useCallback(
    (date:string, timeSlot:string, free:boolean)=>{
        setSchedule((prev)=>({
            ...prev,
            [date]:{
                ...prev[date],
                [timeSlot]: free
            }
        }))
  },[]);

  const removeTimeSlot = useCallback(
    (slotToRemove:string)=>{
        setError('');

        const updatedTimeSlots = timeSlots.filter((slot)=>slot !== slotToRemove);
        setTimeSlots(updatedTimeSlots);

        const updatedSchedule: Schedule = {...schedule};

        dates.forEach((date)=>{
            if(updatedSchedule[date]){
                delete updatedSchedule[date][slotToRemove];
            }
        });
        setSchedule(updatedSchedule);
        showMessage('Time slot removed successfully for all dates');
  },[dates, schedule, showMessage, timeSlots]);

  const saveDeliveryTimes = useCallback(async()=>{
    setError('');
    setSaving(true);
    setMessage('');

    try {
        const scheduleToSend:Schedule = {};

        dates.forEach((date)=>{
            scheduleToSend[date] = {};
            timeSlots.forEach((slot)=>{
                scheduleToSend[date][slot] = schedule[date]?.[slot] !== false;
            })
        });

        const response = await fetch('/api/delivery-times',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({schedule: scheduleToSend}),
        })

        const result = await response.json();

        if(result.success){
            showMessage('Delivery times graphics saved successfully');
        }else{
            setError(result.error || 'Failed to save delivery times graphics');
        }

    } catch(error) {
        console.error('Failed to save delivery times graphics', error);
        setError('Failed to save delivery times graphics');
    }finally{
        setSaving(false);
    }
  },[dates, schedule, showMessage, timeSlots]);

  return{
    schedule,
    loading: isLoading,
    saving,
    message,
    messageType,
    error,
    startTime,
    endTime,
    timeSlots,
    setStartTime,
    setEndTime,
    fetchDeliveryTimes,
    showMessage,
    addTimeSlot,
    updateTimeSlotsStatus,
    removeTimeSlot,
    saveDeliveryTimes
  }
}
