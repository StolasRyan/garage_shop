'use client'
import { useEffect } from 'react'
import { getThreeDaysDates } from './utils/getThreeDaysDates'
import { useDeliverySchedule } from '@/app/hooks/useDeliverySchedule';
import AddTimeSlotForm from './_components/AddTimeSlotForm';
import ScheduleTable from './_components/ScheduleTable';
import { sortTimeSlots } from './utils/sortTimeSlots';
import SaveButton from './_components/SaveButton';
import MessageAalert from './_components/MessageAalert';

const DeliveryTimesAdmin = () => {

    const {
    schedule,
    loading,
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
  } = useDeliverySchedule()

    const dates = getThreeDaysDates();
    const sortedTimeSlots = sortTimeSlots(timeSlots);

    useEffect(()=>{
      fetchDeliveryTimes();  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className='p-3 md:p-4 xl:p-6 w-fill mx-auto md:w-auto'>
        <h1 className='text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center'>Delivery graph controls on 3 days</h1>
        
            <AddTimeSlotForm
            startTime={startTime}
            endTime={endTime}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
            onAddTimeSlot={addTimeSlot}
            />

            <div className='bg-white rounded border border-gray-200 mb-4 md:mb-6 overflow-x-auto'>
                <ScheduleTable
                sortedTimeSlots={sortedTimeSlots}
                dates={dates}
                schedule={schedule}
                onRemoveTimeSlot={removeTimeSlot}
                onUpdateTimeSlotsStatus={updateTimeSlotsStatus}
                />
            </div>
        <div>
        <SaveButton saving={saving} onClick={saveDeliveryTimes}/>
        {message && (<MessageAalert message={message} type={messageType}/>)}
        {error && (
            <div className='p-3 md:p-4 rounded border bg-red-100 text-red-600 border-red-300'>
                {error}
            </div>
        )}
        </div>
    </div>
  )
}

export default DeliveryTimesAdmin