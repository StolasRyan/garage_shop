import { Order } from "@/types/order";
import DateFilterButtons from "./DateFilterButtons";
import Calendar from "./Calendar";
import { CalendarIcon } from "lucide-react";
import { memo, useEffect, useState } from "react";

interface DateSelectorProps {
  customDate: Date | undefined;
  selectedDate: string;
  dates: string[];
  orders: Order[];
  onDateSelect: (date: string) => void;
   isCalendarOpen: boolean;
  toggleCalendar: () => void;
  onCalendarDateSelect: (date: Date | undefined) => void;
}


const DateSelector = memo(({
  customDate,
  selectedDate,
  dates,
  orders,
  onDateSelect,
  isCalendarOpen,
  toggleCalendar,
  onCalendarDateSelect,
}: DateSelectorProps) => {
  
  const [calendarMonth, setCalendarMonth] = useState<Date | undefined>(customDate || new Date());

  useEffect(()=>{
    if(customDate){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCalendarMonth(customDate)
    }
  },[customDate]);


  const handleDateSelect = (date: Date | undefined) => {
    onCalendarDateSelect(date);
    if(date){
      setCalendarMonth(date);
    }
  }


  return (
    <div className="flex justify-start items-center gap-3 relative mb-15">
      <button
        type="button"
        onClick={toggleCalendar}
        className="relative hover:opacity-70 transition-opacity rounded w-15 h-15 bg-[#f3f2f1] flex justify-center items-center cursor-pointer hover:text-primary"
      >
        <CalendarIcon size={20} />
      </button>
      {customDate && (<span className="absolute top-0 text-xs">{customDate.toLocaleDateString("en-GB")}</span>)}
      {isCalendarOpen && (
          <Calendar
          customDate={customDate}
          onDateSelect={handleDateSelect}
          month={calendarMonth}
          />
      )}
      <DateFilterButtons
        dates={dates}
        onDateSelect={onDateSelect}
        orders={orders}
        selectedDate={selectedDate}
      />
    </div>
  );
});
DateSelector.displayName = "DateSelector";
export default DateSelector;
