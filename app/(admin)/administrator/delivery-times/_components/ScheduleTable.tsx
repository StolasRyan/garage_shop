import ScheduleTableHeader from "./ScheduleTableHeader";
import ScheduleTableRow from "./ScheduleTableRow";

interface ScheduleTableProps {
  sortedTimeSlots: string[];
  dates: string[];
  schedule: { [date: string]: { [timeSlot: string]: boolean } };
  onRemoveTimeSlot: (slot: string) => void;
  onUpdateTimeSlotsStatus: (
    date: string,
    timeSlot: string,
    free: boolean,
  ) => void;
}

const ScheduleTable = ({
  sortedTimeSlots,
  dates,
  schedule,
  onRemoveTimeSlot,
  onUpdateTimeSlotsStatus,
}: ScheduleTableProps) => {

    if(sortedTimeSlots.length === 0){
        return(
            <div className="p-6 md:p-8 text-center text-gray-500 text-sm md:text-base">
                No time slots. Add new one upper.
            </div>
        )
    }


  return (
    <div className="w-full">
        <ScheduleTableHeader dates={dates} />
        <div className="divide-y divide-gray-950">
            {sortedTimeSlots.map((slot)=>(
                <ScheduleTableRow
                key={slot}
                timeSlot={slot}
                dates={dates}
                schedule={schedule}
                onRemoveTimeSlot={onRemoveTimeSlot}
                onUpdateTimeSlotsStatus={onUpdateTimeSlotsStatus}
                />
            ))}
        </div>
    </div>
  )
};

export default ScheduleTable;
