import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "../daypicker.css";
import { useEffect, useState } from "react";

interface CalendarProps {
  customDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  month?: Date;
  isOrderDateChange?: boolean
}

const Calendar = ({
  customDate,
  onDateSelect,
  month,
  isOrderDateChange = false
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(month || customDate || new Date());
  const getMonthName = (date: Date) => {
    const monthName = date.toLocaleDateString("en-GB", { month: "long" });
    const capitalizedMonthName =
      monthName.charAt(0).toUpperCase() + monthName.slice(1);
    const year = date.getFullYear();
    return `${capitalizedMonthName} ${year}`;
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  useEffect(()=>{
    if(month){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentMonth(month);
    }
  },[month])
  return (
    <div className={`${isOrderDateChange ? '' : 'absolute top-17 left-0 z-50 bg-white norder border-gray-200 rounded-lg shadow-lg p-4 w-92'}`}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-gray-600">
          {getMonthName(currentMonth)}
        </span>
        <div className="flex gap-x-4 justify-center">
          <button
            onClick={handlePreviousMonth}
            className="p-2 bg-gray-100 hover:bg-primary text-gray-600 hover:text-white rounded duration-300 cursor-pointer"
          >
            <ArrowLeftSquare size={20} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 bg-gray-100 hover:bg-primary text-gray-600 hover:text-white rounded duration-300 cursor-pointer"
          >
            <ArrowRightSquare size={20} />
          </button>
        </div>
      </div>
      <div className="full-width-calendar">
        <DayPicker
        mode="single"
        selected={customDate}
        onSelect={onDateSelect}
        // locale={}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        showOutsideDays={true}
        className="p-0"
        classNames={{
          root: "w-full",
          month: "w-full",
          caption: "hidden",
          nav: "hidden",
          table: "w-full border-collapse",
          head_row: "border-b",
          head_cell: "font-normal py-2 text-sm",
          row: "border-b",
          cell: "h-10 text-center",
          day: "size-10 rounded-full text-[#606060] hover:text-white hover:bg-primary duration-300 cursor-pointer mx-auto",
          day_selected: "bg-primary !text-white",
          day_today: "bg-gray-100 !text-white",
          day_outside: "text-gray-500 opacity-50",
        }}
       modifiersStyles={{
          selected: {
            color: "white",
            backgroundColor: "#3b3787",
            border: "none",
          },
          today: {
            color: "white",
            backgroundColor: "#3b3787",
            border: "none",
          },
        }}
      />
      </div>
    </div>
  );
};

export default Calendar;
